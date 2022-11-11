import React, { useState } from "react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import Arweave from "arweave";
import ImageUploading from "react-images-uploading";

export const Mint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [nft, setNft] = useState<any>(null);
  const [name, setName] = useState("My NFT");
  const [symbol, setSymbol] = useState("MNFT");
  const [uri, setUri] = useState(
    "https://arweave.net/VuAKyW8PhDI2YbHuKzB1tS-gFWvbSLUkytrDq0A8TNY"
  );

  const maxNumber = 69;
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const { publicKey } = useWallet();
  const wallet = useWallet();

  if (!publicKey) return null;

  const mintNft = async () => {
    setIsLoading(true);

    // const image = images[0];
    // const image_data_url = image ? image?.data_url : null;

    // console.log("image", image);

    // const arweave = Arweave.init({
    //   host: "arweave.net",
    //   port: 443,
    //   protocol: "https",
    //   timeout: 20000,
    //   logging: false,
    // });

    // // Upload image to Arweave

    // // const transaction = await arweave.createTransaction({
    // //   data: image_data_url,
    // // });

    // // transaction.addTag("Content-Type", "image/png");

    // let key = await arweave.wallets.generate();

    // // const wallet = {
    // //   d: "ZRtYchOrkxAG7-nhjLXnTjYuRCXu4G4F_E60o_lfjs3g5LmkDGH8qadF3robSQ8FzAaI19MJxOYMJC01vB9vbhQL_aO8-cy8tOTSqYqTmGNxOk2btbILr8LbnzMDoFRM7enyY-oU4_tpYlHPmyXildHt_4UXcy-4hOduyx6ia3i2P6BzMBYp4XdqknLYTCxqcR1qzJQ89qwze_0VfHSu3VqsNHxwG3bS1yw4wrfkyZr0_k86clG33g3uhXleaoILKbUai-bh3EjJHZFC-NsjKbk-TYU5YLaWhGlQ-T3WOjV0jgGRjv6rOHLomD3Nfw_vVw6nUueKPl49atyWiO5QWN0lgZf25u5I2HH-inu4Zp8Py2R2cahTV9zlRlHXKYbm2okQtX-bfhfHZsbb9aIC_rHmmcMlPJQHkR8zNzT_t-S2TASBExDFLlL3jXQNicRMfcpUZkqc9DR8JtAUYzwK-0IyS4pTT2eweZiQw3gxehkrhlHQVFO92Kn5lBrl7_f0RKMRJsjzT4UrZJ5JLbZ2tMga7Cg0xuJx0SVCHgkt4trCoTikUVUi75fCjjD41Qi8HBs8ilBrc2CXHkEmL7qH9MKHyjPT-eF7ZfNLVp65Ij-XwFOvVPkJTQCcHqhLDXeIKvWJbreptGVy7H8Q0JFcVk8Z9FFMBXIm1OrlRG9Ug8E",
    // //   dp: "ode944n-cADZMIXYndz4CpYcakZz7NeQ3clvre4WV3qOR2jkvcbsZkJy85fX7yMQ4qc5afQKNxroKQeoj9jy94uLssDiyjVhkUr24W4CGO8LOuAu5W9cDItLRxA2Y6UjXC58R02o3x9V9M5MbgHdgI9B6a7oCtWxvQ4lePji6BLgC1mBvFPOqaPle2g1l6JZSjKNfsJqOQ0kJ31mvU0qAVGMy1ouKZ0a2pzyT1qzekOhBnOF_1TgPyzn-_kzFBAZCUgT5IWbK3GdTndue9XSzU4XSWeqUCGVWmGRYOu_9XjLSfYdgve04pG-UtVSdPKP3wRODJOo5lopLLn5WAEtjQ",
    // //   dq: "WHSFAHQuqzKvcWmPv0QH4mmc8_CgLIz0iqBb9eTKAt9gw30_fhNYVuIWvEDPU56bHV1Bx-R6Lb4V_E7ZqLmeZ9ii5KWeNpa186gHXsR0gh40e9vq4nyH7J8J0JgxkdrtAeZ7R1SyuKJFGtuawibYuvN9KYnHn9FJx-ExhU8FeIahiC49_nw140eBFCoQX_Ae9Dj0Ug3XKAqLlX2XAg1jU0wYv1XubDMHwdnxAGKGAvGxLcxWcjeBQ_i5CVIDRPC4Pwjv6fk2LPa1SN3RJrp49mlwxyVirOSGwQu-rbbhD9j1oO37GNj699-PGhaP7tavt2YMr7Wghx2q0LY8nyQu3Q",
    // //   e: "AQAB",
    // //   ext: true,
    // //   kty: "RSA",
    // //   n: "sp_BYE-0TQpIUnyPQVzVIbb9lkAP8Z_fKtGTlvsAHJSB-lS_8eiLNGtug0jjerA3ZQ-MDTi1sH_CPMsfstrQcttbKQSLjJJYrOwfPItTVFnx9io4cgth5X10x4M_ydcgiGlW091Hl3AcB7Ire6YbBbe0J3CeEA9RdsCXZfOdzJ9z8HpAC4w9_wPkdso_CneEGJEPB8cXUWKBkyIvGmeJwh9QUm4d3e3hSlvdpzrZMvSP77ACOBCh-qEvHbOCJvrnn7gJuTuqHjeTnXhNXHXlpOG_AvNLZmkqh-vUvAfV_KhgToxWBKOYz1lHWcHgEW2Tut2YG-1uLlKsM6In5fmo8AwqfmN_qLrwdFkZEyrUg3sFpqxvZXgbpefBhLxi6YUD79as2Y_1jS2-Ofmn2Z4rzOLDlrOtS7yctyl-egh6LWEyIEplH1bgnt2L_lLdYlZwkrvImA8FIOCEAmg-V6idVKz215bU5Wyj-21O1UnqGMbuT49nE3ZU_mrhdO_mbEpKdq4TjL4A1FcrZmG2FOMl7o3SybbUiCKBFji9tVUAV__smwW3Mzeaw77CC_6d8MrCK4ZXstRwrrD94KdJhxyhsHb-0wJcp6t2EwNI_21YFvf2RJpJipYkGRZbmsLnxYTEHRpo7rFxT060MvXEKztOnMl_GnP-O64Vm2i1E-zetV8",
    // //   p: "6AsFNFeDgBR7cXjxsdNXQ8_f7B98vf1GyXmYefHMcGs0Mlr0ED1ZYTrYjNXTTVZwSfjr2xykXAL_basgmn5L4PE-dW9hdIxCH6J-nm7A2o-wH_bqJ-NsWONKa_mrGGHNT7pr8X6KC86cAk8QXc95a_ifA--n-DD_IWl-lABhUfIWxeLtm2DfSjLqQT6QPwoHtZoL26nNXkaSyDdeOifChSfU4Ynh2HqFC2PuA0bAIDWPN5JMp1CiTbJqtMTovhPDyncYnLBNhGO9BKcOyuAJKFcJFMtjGDRznfZdod9o7VUCT8ggT1UpJ3nceTc9VqVVA3wJArWClPf9FNzft-yWCw",
    // //   q: "xRDaF4Y6SJuNnadVBX1Drs1AH91dgCu7CcNmt5xfnp1ACA7-gYjZgtPiSvV-E34u5-xt8HohfStueyWe0yHw0Xogv_IZ2Rurd7O5Js1-TbyLOO0dCykANc6S6V1wjJniXdw1WCoRbxP4SDOjErctRu-ChQQ2oWdSGbK3jnSD4_G2CUZcX8fstf9twtlf3_qzAyzz8D_9ryJc2v-qObxKHbSD7Jl0-IUT1y7RYkFXaVcw4JI89PBSh4ydQPAocJwQC5Ew9Y7jB_P5shrxZLFab1NERpz0sqv5if_Fdm2EtcJzox_BZtrdczLtMOD1YvGM0KpTOmel9BjEPlp_662WfQ",
    // //   qi: "c_A6jxyKG8kUSZ4ml2txM8LbquEfsLuiLHFepqFshSsQk4DrkGV_OrWCisJkrV-fVD69Jg2zlWvjKkhm1UXrAtJ4WRSWpLReN3Q8VStPpCX5PEt06g2z2XDPj74PTj64U-C5i0GWpE1fln_QxTxN_BtPKVDOXvuMXMzAqNMoSuwBsW182q9uJHwMcaci4_dSQn387WfrTg0iL1ke1RPSh4NjMrUCGcoeWtwo9fBlBikDc0rGxn_Ibw54SI1Gm5SjpBU79_LZ8efhRJeB-Z_7FRvdtqdUd1UBxwsfcto4z-6D_s5GDospCASGmTNa4IkYH6Or-wcZ8vtmuRBznkY6vA",
    // // };

    // // await arweave.transactions.sign(transaction, wallet);

    // // const response = await arweave.transactions.post(transaction);
    // // console.log(response);

    // // const id = transaction.id;
    // // const imageUrl = id ? `https://arweave.net/${id}` : undefined;
    // // console.log("imageUrl", imageUrl);

    // // Upload metadata to Arweave

    // const metadata = {
    //   name: "Custom NFT #1",
    //   symbol: "CNFT",
    //   description: "A description about my custom NFT #1",
    //   seller_fee_basis_points: 500,
    //   external_url: "https://www.customnft.com/",
    //   attributes: [
    //     {
    //       trait_type: "NFT type",
    //       value: "Custom",
    //     },
    //   ],
    //   collection: {
    //     name: "Test Collection",
    //     family: "Custom NFTs",
    //   },
    //   properties: {
    //     files: [
    //       {
    //         uri: "https://arweave.net/VuAKyW8PhDI2YbHuKzB1tS-gFWvbSLUkytrDq0A8TNY",
    //         type: "image/png",
    //       },
    //     ],
    //     category: "image",
    //     maxSupply: 0,
    //     creators: [
    //       {
    //         address: "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx",
    //         share: 100,
    //       },
    //     ],
    //   },
    //   image: "https://arweave.net/VuAKyW8PhDI2YbHuKzB1tS-gFWvbSLUkytrDq0A8TNY",
    // };

    // const metadataRequest = JSON.stringify(metadata);

    // const metadataTransaction = await arweave.createTransaction({
    //   data: metadataRequest,
    // });

    // metadataTransaction.addTag("Content-Type", "application/json");

    // await arweave.transactions.sign(metadataTransaction, key);

    // console.log("metadata txid", metadataTransaction.id);

    // console.log(await arweave.transactions.post(metadataTransaction));

    //METAPLEX

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const metaplex = new Metaplex(connection);
    metaplex.use(walletAdapterIdentity(wallet));

    const nft = await metaplex
      .nfts()
      .create({
        name: "My NFT",
        symbol: "MNFT",
        sellerFeeBasisPoints: 10,
        uri: "https://arweave.net/VuAKyW8PhDI2YbHuKzB1tS-gFWvbSLUkytrDq0A8TNY",
        // payer: fromWallet,
        tokenOwner: publicKey,
      })
      .run();

    console.log("Metaplex NFT:", nft);

    setIsLoading(false);
    setNft(nft?.nft);
  };

  if (isLoading) return <div>Loading...</div>;

  if (nft) return <div>NFT minted!</div>;

  return (
    <div>
      {/* <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <br />
      <br /> */}
      <label>Name</label> <br />
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <br /> <br />
      <label>Symbol</label> <br />
      <input onChange={(e) => setSymbol(e.target.value)} value={symbol} />
      <br /> <br />
      <label>Uri</label> <br />
      <input onChange={(e) => setUri(e.target.value)} value={uri} />
      <br /> <br />
      <button
        // disabled={images.length === 0}
        onClick={() => mintNft()}
      >
        Mint NFT
      </button>
    </div>
  );
};
