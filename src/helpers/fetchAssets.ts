import * as shapeUtils from '@unegma/shapes';
import { Source } from '../types/SourceEnum';
import { DisplayMode } from '../types/DisplayModeEnum';

/**
 * Offset is for using with opensea api and is used for getting past the 20 max
 * @param assetsArray
 * @param maxImages
 * @param address
 * @param source
 * @param offset
 */
export default async function getAssets(assetsArray: [], maxImages: number, address: string, source: string, offset = 0): Promise<any> {
  console.log('hello from getAssets');
  let assets = <any>assetsArray;

  // added this here with await instead of using only maxImages pulled in, because of possible race conditions
  let localStorageMaxImages = await localStorage.getItem('maxImages');
  if (typeof localStorageMaxImages !== "undefined" && localStorageMaxImages !== null && localStorageMaxImages !== "") {
    maxImages = parseInt(localStorageMaxImages);
  }

  // // added this here with await instead of using only address pulled in, because of possible race conditions


  // todo this is really hacky and should be working based on parameter passed in
  let queryString = new URLSearchParams(window.location.search);
  let p = queryString.get('p');
  let sharedGalleryView = false;
  if (typeof p !== 'undefined' && p !== null) {
    sharedGalleryView = true;
  }

  // todo could just get this from url if passing in as a parameter doesn't work?
  let localStorageSharedAddress = await localStorage.getItem('sharedaddress');
  if (typeof localStorageSharedAddress !== "undefined" && localStorageSharedAddress !== null && localStorageSharedAddress !== "") {
    address = localStorageSharedAddress;
  }

  // this is currently using the sharedaddress as an override (until find a way to maybe store all data in url or on a server) (see else clause on homepage with sharedaddress)
  if (sharedGalleryView === false) {
    let localStorageAddress = await localStorage.getItem('address');
    if (typeof localStorageAddress !== "undefined" && localStorageAddress !== null && localStorageAddress !== "") {
      address = localStorageAddress;
    } else {
      console.log('nothing fetched');
      return []; // todo is this in the case address is not set?
    }
  }

  let localStorageSource = localStorage.getItem('source');
  if (typeof localStorageSource !== "undefined" && localStorageSource !== null && localStorageSource !== "") {
    source = localStorageSource;
  }

  try {
    console.log('preparing to fetch assets');
    /**
     * Opensea
     * this is be called multiple times depending on the offset
    */
    // 20 is the default limit

    if (source === Source.Wallet) {

      let openSeaAssets;
      openSeaAssets = await fetch(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=20&owner=${address}`);
      openSeaAssets = await openSeaAssets.json();
      openSeaAssets = openSeaAssets.assets;
      assets = assets.concat(openSeaAssets); // this is either just the unstructured assets from opensea, or a concatination of structured assets (see below) AND new offsetted unstructured assets

    /**
     * POAP
     */
    } else if (source === Source.POAP) {
      console.log('Fetching with address:');
      console.log(address);
      let poapAssets;
      let assetsAddress = address ? `https://api.poap.xyz/actions/scan/${address}` : '';
      // todo did the above because of a weird error with address being empty. maybe a race condition? still an error caught with < in JSON

      poapAssets = await fetch(assetsAddress);
      poapAssets = await poapAssets.json();
      // poapAssets = poapAssets.assets;
      assets = assets.concat(poapAssets); // this is either just the unstructured assets from opensea, or a concatination of structured assets (see below) AND new offsetted unstructured assets

    }

  } catch (e) {
    console.log(`Error`, e);
    return [];
  }

  try {
    console.log('Assets:');
    console.log(assets);
    if (assets.length > 0) {

      // create new array of Structured assets
      let structuredAssets = assets.map((asset: any, index: number) => {

        let assetImage, assetImageThumbnail, assetImageName, assetImageDescription, dateString, lastSalePriceInEth;
        let baseScale = 1.5, priceIncreaseScale = 10; // scales for increasing size based on cost
        let scale = [baseScale, baseScale, baseScale];

        /**
         * Opensea
         */
        if (source === Source.Wallet) {

          index = index + offset; // this becomes 20+index whenever using opensea. is always 0+index when using KO

          // this is a bit hacky, but in the scenario where multiple calls are made, the array will be formed of
          // records with formatted data, and records with data which hasn't been formatted yet, so only edit the ones
          // with no formatting yet
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
            baseScale = baseScale + (lastSalePriceInEth * priceIncreaseScale); // increase size of item by last sale price*2
          }
          scale = [baseScale, baseScale, baseScale];


          // TODO WHY IS assetImage BECOMING UNDEFINED AT THIS POINT? HACKY FIX
          // console.log(`here2`,assetImage);
          if (typeof assetImage === 'undefined') {
            assetImage = assetImageThumbnail;
          }

        /**
         * POAP
         */
        } else if (source === Source.POAP) {
          console.log(asset); // todo seems to be a bug here
          assetImage = asset.event.image_url;
          assetImageThumbnail = asset.event.image_url;
          assetImageName = asset.event.name;
          assetImageDescription = asset.event.description;

          let newDate = new Date();
          newDate.setTime(asset.event.start_date*1000);
          dateString = newDate.toUTCString();
        }

        return {
          asset: asset,
          order: index,
          imageUrl: assetImage,
          thumbnail: assetImageThumbnail,
          name: assetImageName,
          description: assetImageDescription,
          scale: scale,
          dateString: dateString,
          lastPrice: lastSalePriceInEth,
        }
      }).filter((e: any) => e); // trim any nulls



      /**
       * trim arrays to get final array
       */


      let finalAssets = [];

      // this section is for opensea which returns 20 at a time

      // get more if needed
      // todo THIS MIGHT NEED TO BE > offset OTHERWISE COULD ENTER AN INFINITE CALLING LOOP
      // todo might need to do a test for if assets.length == 0

      /**
       * Opensea
       */
      if (source === Source.Wallet) {
        if (structuredAssets.length < maxImages && structuredAssets.length >= offset) {
          return await getAssets(structuredAssets, maxImages, address, source, offset + 20); // may be a better way of getting 20 at a time and then slicing to be length of maxImages
        } else {
          // this should be equal to maxImages
          finalAssets = structuredAssets.splice(0, maxImages);
        }
        /**
         * POAP
         */
      } else if (source === Source.POAP) {
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
  shapes[DisplayMode.Cluster] = shapeUtils.createCluster(index);
  shapes[DisplayMode.Spiral] = shapeUtils.createSpiral(index);
  shapes[DisplayMode.Galaxy] = shapeUtils.createGoldenSpiral(index);
  shapes[DisplayMode.Swirl] = shapeUtils.createSwirl(index);
  return shapes;
}

