import * as shapeUtils from '@unegma/shapes';

/**
 * Offset is for using with opensea api and is used for getting past the 20 max
 * @param assetsArray
 * @param maxImages
 * @param address
 * @param source
 * @param offset
 */
export default async function getAssets(assetsArray: [], maxImages: number, address: string, source: number, offset = 0): Promise<any> {
  let assets = <any>assetsArray;

  console.log(`The Address ${address}`);

  // added this here with await instead of using only maxImages pulled in, because of possible race conditions
  let localStorageMaxImages = await localStorage.getItem('maxImages');
  if (typeof localStorageMaxImages !== "undefined" && localStorageMaxImages !== null && localStorageMaxImages !== "") {
    maxImages = parseInt(localStorageMaxImages);
  }

  // // added this here with await instead of using only address pulled in, because of possible race conditions
  let localStorageAddress = await localStorage.getItem('address');
  if (typeof localStorageAddress !== "undefined" && localStorageAddress !== null && localStorageAddress !== "") {
    address = localStorageAddress;
  } else {
    return [];
  }

  let localStorageSource = localStorage.getItem('source');
  if (typeof localStorageSource !== "undefined" && localStorageSource !== null && localStorageSource !== "") {
    source = parseInt(localStorageSource);
  }

  try {

    /**
     * Opensea
     * this is be called multiple times depending on the offset
    */
    // 20 is the default limit

    let openSeaAssets;
    openSeaAssets = await fetch(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=20&owner=${address}`);
    openSeaAssets = await openSeaAssets.json();
    openSeaAssets = openSeaAssets.assets;
    assets = assets.concat(openSeaAssets); // this is either just the unstructured assets from opensea, or a concatination of structured assets (see below) AND new offsetted unstructured assets

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

        // this is a bit hacky, but in the scenario where multiple calls are made, the array will be formed of
        // formatted data, and data which hasn't been formatted yet, so only edit the ones with no formatting yet
        if (asset.hasOwnProperty('asset') && asset.hasOwnProperty('order')) {
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


        // TODO WHY IS assetImage BECOMING UNDEFINED AT THIS POINT? HACKY FIX
        // console.log(`here2`,assetImage);
        if(typeof assetImage === 'undefined') {
          assetImage = assetImageThumbnail;
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

      // this section is for opensea which returns 20 at a time

      // get more if needed
      // todo THIS MIGHT NEED TO BE > offset OTHERWISE COULD ENTER AN INFINITE CALLING LOOP
      // todo might need to do a test for if assets.length == 0
      if (structuredAssets.length < maxImages && structuredAssets.length >= offset) {
        return await getAssets(structuredAssets, maxImages, address, source, offset+20); // may be a better way of getting 20 at a time and then slicing to be length of maxImages
      } else {
        // this should be equal to maxImages
        finalAssets = structuredAssets.splice(0, maxImages);
      }


      // reorder them to ensure 1 to whatever number and then create the shapes
      // todo from Opensea, these might not be correct
      finalAssets = finalAssets.map((asset:any, index: number) => {
        asset.order = index+1;
        asset.displayMode = createShapes(asset.order);
        return asset;
      })
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

  shapes.push(shapeUtils.createCluster(index));
  shapes.push(shapeUtils.createSpiral(index));
  shapes.push(shapeUtils.createGoldenSpiral(index));
  shapes.push(shapeUtils.createSwirl(index));

  return shapes;
}

