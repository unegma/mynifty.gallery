import {randFloat} from "three/src/math/MathUtils";

/**
 * Offset is for using with opensea api and is used for getting past the 20 max
 * @param assetsArray
 * @param maxImages
 * @param source
 * @param address
 * @param offset
 */
export default async function getAssets(assetsArray: [], maxImages: number, source: string, address: string, offset = 0): Promise<any> {
  let assets = <any>assetsArray;

  // added this here with await instead of using only maxImages pulled in, because of possible race conditions
  let localStorageMaxImages = await localStorage.getItem('maxImages');
  if (typeof localStorageMaxImages !== "undefined" && localStorageMaxImages !== null && localStorageMaxImages !== "") {
    maxImages = parseInt(localStorageMaxImages);
  }

  // added this here with await instead of using only address pulled in, because of possible race conditions
  let localStorageAddress = await localStorage.getItem('address');
  if (typeof localStorageAddress !== "undefined" && localStorageAddress !== null && localStorageAddress !== "") {
    address = localStorageAddress;
  }

  // todo STILL HAVING TO DO THIS HERE INSTEAD OF BEING PASSED IN
  let localStorageSource = await localStorage.getItem('source');
  if (typeof localStorageSource !== "undefined" && localStorageSource !== null && localStorageSource !== "") {
    source = localStorageSource;
  }
console.log(address)
  try {
    /**
     * KO
     * This is only ever called once
     */
    if (source === 'knownorigin') {
      // desc seems to show the most recent
      assets = await fetch(`https://api.thegraph.com/subgraphs/name/knownorigin/known-origin`, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          query($add: [String]) { tokens(orderBy: lastTransferTimestamp, orderDirection: desc, where: {currentOwner_in: $add}) {
            id
            lastSalePriceInEth
            lastTransferTimestamp
            metadata {
              name
              description
              image
              artist
              scarcity
              cover_image_size_in_bytes
              image_size_in_bytes
              cover_image
            }
          }}`,
          variables: {
            add: [address]
          }
        })
      });

      console.log(assets);

      // might break if you pass in an array here, but shouldn't be an issue because that would never happen with KO
      assets = await assets.json();
      console.log(assets);
      assets = assets.data.tokens;

    /**
     * Opensea
     * this is be called multiple times depending on the offset
    */
    } else if (source === 'opensea') {
      // 20 is the default limit

      let openSeaAssets;
      openSeaAssets = await fetch(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=20&owner=${address}`);
      openSeaAssets = await openSeaAssets.json();
      openSeaAssets = openSeaAssets.assets;
      assets = assets.concat(openSeaAssets); // this is either just the unstructured assets from opensea, or a concatination of structured assets (see below) AND new offsetted unstructured assets
    }

  } catch (e) {
    console.log(`Error`, e);
    return [];
  }

  try {
    if (assets.length > 0) {
      // create new array of Structured assets
      let structuredAssets = assets.map((asset: any, index: number) => {
        index = index+offset; // this becomes 20+index whenever using opensea. is always 0+index when using KO

        let scale, baseScale = 1.5, priceIncreaseScale = 10; // scales for increasing size based on cost
        let assetImage, assetImageThumbnail, assetImageName, assetImageDescription, dateString, lastSalePriceInEth;

        /**
         * KO
         */
        if (source === 'knownorigin') {
          let assetImage = asset.metadata.image;
          if (assetImage == null || assetImage == "") {
            return null;
          }

          if (assetImage.includes('ipfs://')) {
            // for structuring urls:
            // ipfs://Qmb4zQH54vKrMrJZoku2zdCnELeQ5HArXmPEtQPf2qWPKk/asset.gif
            // https://ipfs.infura.io/ipfs/QmVdyHRUvKiQukpmHgFbrbkPey7F2fLrQPiM8xvNfELWCg
            assetImage = assetImage.replace('ipfs://', 'https://ipfs.infura.io/ipfs/');
          }

          // currently remove mp4s
          if (assetImage.includes('.mp4')) {
            return null;
          }

          assetImageThumbnail = assetImage; // todo hopefully they will add a url for thumbnails (maybe exists somewhere?)
          if (assetImage == null || assetImage == "") return null; // remove nft if no image (maybe could have a black hole image instead)

          assetImageName = asset.metadata.name;
          assetImageDescription = asset.metadata.description;
          lastSalePriceInEth = asset.lastSalePriceInEth;

          if (lastSalePriceInEth && Number.parseFloat(lastSalePriceInEth) > 0) {
            baseScale = baseScale + (lastSalePriceInEth*priceIncreaseScale); // increase size of item by last sale price*2
          }
          scale = [baseScale, baseScale, baseScale];


          let newDate = new Date();
          newDate.setTime(asset.lastTransferTimestamp*1000);
          dateString = newDate.toUTCString();

          /**
           * OpenSea
           */
        } else if (source === 'opensea') {
          // this is a bit hacky, but in the scenario where multiple calls are made, the array will be formed of
          // formatted data, and data which hasn't been formatted yet, so only edit the ones with no formatting yet
          if (asset.hasOwnProperty('asset') && asset.hasOwnProperty('order')) {
            console.log(`here ${index}`);
            return asset;
          }
          assetImage = asset.image_url;

          // currently remove mp4s
          if (assetImage.includes('.mp4')) {
            return null;
          }

          assetImageThumbnail = asset.image_thumbnail_url;
          if (assetImageThumbnail == null) {
            assetImageThumbnail = assetImage;
          }

          if (assetImage == null || assetImage == "") return null; // some images have no image set by the looks of it // this could cause breaks in the order, so may be better to go through and number then at the end
          assetImageName = asset.name;
          assetImageDescription = asset.description;
          lastSalePriceInEth = asset.lastPrice;

          // todo sort datestring for last sale
          // let newDate = new Date();
          // newDate.setTime(asset.lastTransferTimestamp*1000);
          // dateString = newDate.toUTCString();

          if (lastSalePriceInEth && Number.parseFloat(lastSalePriceInEth) > 0) {
            baseScale = baseScale + (lastSalePriceInEth*priceIncreaseScale); // increase size of item by last sale price*2
          }
          scale = [baseScale, baseScale, baseScale];
        }

        return {
          asset: asset,
          order: index,
          imageUrl: assetImage,
          thumbnail: assetImageThumbnail,
          name: assetImageName,
          description: assetImageDescription,
          scale: scale,
          dateLost: dateString,
          lastPrice: lastSalePriceInEth,
        }
      }).filter((e:any) => e); // trim any nulls


      /**
       * trim arrays to get final array
       */


      let finalAssets = [];
      if (source === 'knownorigin') {
        // set be no higher than max images (this is done last because array might have lost some items
        // in the algorithm above)
        finalAssets = structuredAssets.slice(0, maxImages); //todo check whether to use this or the below with splice
      } else if (source === 'opensea') {
        // this section is for opensea which returns 20 at a time

        // get more if needed
        // todo THIS MIGHT NEED TO BE > offset OTHERWISE COULD ENTER AN INFINITE CALLING LOOP
        // todo might need to do a test for if assets.length == 0
        if (structuredAssets.length < maxImages && structuredAssets.length >= offset) {
          return await getAssets(structuredAssets, maxImages, source, address, offset+20); // may be a better way of getting 20 at a time and then slicing to be length of maxImages
        } else {
          // this should be equal to maxImages
          finalAssets = structuredAssets.splice(0, maxImages);
        }
      }


      // reorder them to ensure 1 to whatever number and then create the shapes
      // todo from Opensea, these might not be correct
      finalAssets = finalAssets.map((asset:any, index: number) => {
        asset.order = index+1;
        asset.displayMode = createShapes(asset.order);
        return asset;
      })
      console.log ('finalAssets', finalAssets);

      return finalAssets;
    } else {
      return [];
    }

  } catch (e) {
    console.log(`Error`, e); // todo display error in top left if an error
    return [];
  }
}

/**
 * Functions
 * @param index
 */

function createShapes(index:number) {
  let shapes = <any>[];

  shapes.push(createCluster(index));
  shapes.push(createSpiral(index));
  shapes.push(createGoldenSpiral(index));
  shapes.push(createSwirl(index));

  return shapes;
}

/**
 * Shapes
 * @param index
 */

function createCluster(index:number) {
  // create co-ordinates based on the a number between 0 and the index of the item (higher index = older item)
  // the second part randomly creates 1 or negative 1 to add depth along each axis
  let pos1 = randFloat(0, index) * getRandomOneOrNegativeOne();
  let pos2 = randFloat(0, index) * getRandomOneOrNegativeOne();
  let pos3 = randFloat(0, index) * getRandomOneOrNegativeOne();

  return { pos1: pos1, pos2: pos2, pos3: pos3 };
}

function createSpiral(index:number) {
  // create co-ordinates based on the a number between 0 and the index of the item (higher index = older item)
  // the second part randomly creates 1 or negative 1 to add depth along each axis
  let pos1 = 7*Math.sin(index) *-1;
  let pos2 = 7*Math.cos(index) *-1;
  let pos3 = 7*index *-1;

  return { pos1: pos1, pos2: pos2, pos3: pos3 };
}


function createGoldenSpiral(index:number) {
  // // https://www.reddit.com/r/theydidthemath/comments/286tqb/3d_golden_spiral_equation/
  const exponent = 0.306349; // growth factor in Radians: `ln(phi)/(pi/2)` OR in Degrees: `ln(phi)/90`
  const angle = index;// theta
// const angle = (index + 0.1) * (Math.round(Math.random()) * 2 - 1) ;// theta
  const slope = 0.2;
  const t = index - index / 2; // todo what is t?

  let pos1 = ((Math.exp(exponent) * angle) * Math.sin(angle));
  let pos2 = ((Math.exp(exponent) * angle) * Math.cos(angle));
  let pos3 = ((index * (slope * angle))) / (index * Math.sqrt(index));

  return { pos1: pos1, pos2: pos2, pos3: pos3 };
}


function createSwirl(index: number) {
  // // https://www.reddit.com/r/theydidthemath/comments/286tqb/3d_golden_spiral_equation/
  // const exponent2 = 0.306349; // growth factor in Radians: `ln(phi)/(pi/2)` OR in Degrees: `ln(phi)/90`
  const exponent2 = 0.1; // growth factor in Radians: `ln(phi)/(pi/2)` OR in Degrees: `ln(phi)/90`
  // const angle = index ;// theta
  const angle2 = 0.5 * index;// theta
  // const angle2 = (index + 0.1) * (Math.round(Math.random()) * 2 - 1) ;// theta
  const slope2 = 3;
  // const t2 = index - index/2; // todo what is t?

  let pos1 = ((Math.exp(exponent2) * angle2) * Math.sin(angle2));
  let pos2 = ((Math.exp(exponent2) * angle2) * Math.cos(angle2));
  let pos3 = index + (slope2 * exponent2);
  // let pos3dm4 = ((index*(slope2 * angle2))) / (index * Math.sqrt(index));
  // let pos3dm4 = ((Math.tan(slope) * ((Math.sqrt(1+exponent) )*Math.exp(exponent * t))/exponent ));

  return { pos1: pos1, pos2: pos2, pos3: pos3 };
}


/**
 * Low Level functions
 */
function getRandomOneOrNegativeOne () {
  return (Math.round(Math.random()) * 2 - 1);
}
