import {randFloat} from "three/src/math/MathUtils";

export default async function getAssets(assetsArray: [], tempIndex = 0, offset = 0) {
  let assets;

  // TODO ADD TRY CATCH

  // desc seems to show the most recent
  assets = await fetch(`https://api.thegraph.com/subgraphs/name/knownorigin/known-origin`, {
    method: 'POST',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        query: `
          query { tokens(orderBy: lastTransferTimestamp, orderDirection: desc, where: {currentOwner_in: [
            "0x000000000000000000000000000000000000dead", 
            "0x0000000000000000000000000000000000000000"
          ]}) {
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
          }}`
      }
    )
  });

  // assets = await fetch(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=20&owner=0x0000000000000000000000000000000000000000`);
  assets = await assets.json();
  assets = assets.data.tokens;

  // TODO ADD TRY CATCH (there is a scenario where if the image can't be resolved, it crashes the whole app)

  if (assets.length > 0) {
    let newAssets = assets.map((asset: any, index: number) => {

      let imageURL = asset.metadata.image;

      // console.log(imageURL);
      //ipfs://Qmb4zQH54vKrMrJZoku2zdCnELeQ5HArXmPEtQPf2qWPKk/asset.gif
      //https://ipfs.infura.io/ipfs/QmVdyHRUvKiQukpmHgFbrbkPey7F2fLrQPiM8xvNfELWCg

      if (imageURL == null || imageURL == "") {
        return null;
      }

      if (imageURL.includes('ipfs://')) {
        imageURL = imageURL.replace('ipfs://', 'https://ipfs.infura.io/ipfs/');
      }

      // console.log(`new imageurl ${imageURL}`);

      //ko
      let assetImage, assetImageThumbnail, assetImageName, assetImageDescription;
      assetImageThumbnail = imageURL;
      assetImage = imageURL;
      if (assetImage == null || assetImage == "") return null;
      tempIndex = tempIndex + 1;
      assetImageName = asset.metadata.name;
      assetImageDescription = asset.metadata.description;

      // opensea
      // let assetImage, assetImageThumbnail, assetImageName, assetImageDescription;
      // assetImageThumbnail = asset.image_thumbnail_url;
      // assetImage = asset.image_url;
      // if (assetImage == null || assetImage == "") return null;
      // tempIndex = tempIndex + 1;
      // assetImageName = asset.name;
      // assetImageDescription = asset.description;
      // }

      const getRandomOneOrNegativeOne = () => {
        return (Math.round(Math.random()) * 2 - 1);
      }

      // create co-ordinates based on the a number between 0 and the index of the item (higher index = older item)
      // the second part randomly creates 1 or negative 1 to add depth along each axis
      let pos1dm1 = randFloat(0, index) * getRandomOneOrNegativeOne();
      let pos2dm1 = randFloat(0, index) * getRandomOneOrNegativeOne();
      let pos3dm1 = randFloat(0, index) * getRandomOneOrNegativeOne();


      // x = sin(i)
      // y = cos(i)
      // z = i


      let pos1dm2 = 7*Math.sin(index) *-1;
      let pos2dm2 = 7*Math.cos(index) *-1;
      let pos3dm2 = 7*index *-1;

      //
      // // https://www.reddit.com/r/theydidthemath/comments/286tqb/3d_golden_spiral_equation/
      // const exponent = 0.306349; // growth factor in Radians: `ln(phi)/(pi/2)` OR in Degrees: `ln(phi)/90`
      // const angle = (index + 0.1) * (Math.round(Math.random()) * 2 - 1) ;// theta
      // const slope = 0.2;
      // // const t = 0.3;
      //
      // let pos1spiral = Math.exp(exponent) * angle * Math.cos(angle);
      // let pos2spiral = Math.exp(exponent) * angle * Math.sin(angle);
      // let pos3spiral = slope * angle;
      // let pos3 = Math.tan(slope) * (Math.sqrt(1+exponent) * Math.exp(exponent) * t) / exponent;


      let scale, baseScale = 1.5, priceIncreaseScale = 10;
      let lastSalePriceInEth = asset.lastSalePriceInEth;

      if (lastSalePriceInEth && Number.parseFloat(lastSalePriceInEth) > 0) {
        baseScale = baseScale + (lastSalePriceInEth*priceIncreaseScale); // increase size of item by last sale price*2
      }
      scale = [baseScale, baseScale, baseScale];


      let newDate = new Date();
      newDate.setTime(asset.lastTransferTimestamp*1000);
      let dateString = newDate.toUTCString();

      return {
        order: tempIndex,
        imageUrl: assetImage,
        thumbnail: assetImageThumbnail,
        name: assetImageName,
        description: assetImageDescription,
        scale: scale,
        displayMode: [
          {
            pos1: pos1dm1,
            pos2: pos2dm1,
            pos3: pos3dm1
          },{
            pos1: pos1dm2,
            pos2: pos2dm2,
            pos3: pos3dm2
          },
        ],
        asset: asset,
        dateLost: dateString,
        lastPrice: lastSalePriceInEth
      }
    }).filter((e:any) => e); // trim any nulls


    // todo could do a check here for any assets without a picture



    // this section is for opensea which returns 20 at a time
    // let joinedAssets = newAssets.concat(assetsArray);
    //
    // console.log('here')
    // if (joinedAssets.length <= 10) {
    //   getAssets(joinedAssets, tempIndex, offset+20);
    // } else {
    //   console.log('final array');
    //   console.log(joinedAssets);
    //   setGallery(joinedAssets);
    // }

    return newAssets;
  } else {
    return [];
  }
}
