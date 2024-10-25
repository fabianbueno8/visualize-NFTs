
document.getElementById('nftForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tokenId = document.getElementById('tokenId').value;
    const network = 80001; // Matic Mumbai Testnet
    const contractAddress = "0x6412bdbDf58634f6805cb83613B2B1"; // Dirección del contrato

    // Llamada a la API de Vottun para obtener la URI del token
    const uriResponse = await fetch('https://api.vottun.tech/erc/v1/erc721/tokenUri', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contractAddress: contractAddress,
            network: network,
            id: tokenId
        })
    });

    const uriData = await uriResponse.json();
    if (uriData.uri) {
        // Realizamos una nueva solicitud para obtener los datos de la metadata
        const metadataResponse = await fetch(uriData.uri);
        const metadata = await metadataResponse.json();

        // Actualizamos el frontend con los datos del NFT
        document.getElementById('nftResult').innerHTML = `
            <div class="card">
                <img src="${metadata.image}" class="card-img-top" alt="${metadata.name}">
                <div class="card-body">
                    <h5 class="card-title">${metadata.name}</h5>
                    <p class="card-text">${metadata.description}</p>
                </div>
            </div>
        `;
    } else {
        document.getElementById('nftResult').innerHTML = `<p class="text-danger">No se encontró la metadata del NFT.</p>`;
    }
});
