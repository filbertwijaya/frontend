const BASE_URL = "http://localhost:8080";

const getStock = async () => {
    const response = await fetch(`${BASE_URL}/bahan`)
    return await response.json();
}

const getRecent = async () => {
    const response = await fetch(`${BASE_URL}/recent`)
    return await response.json();
}

const putMix = async (qtyAlkohol, qtyAloe, qtyHidro) => {
    const response = await fetch(`${BASE_URL}/campuran`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            qty_alkohol  : qtyAlkohol,
            qty_aloevera : qtyAloe,
            qty_hidrogen : qtyHidro
        })
    });

    return await response.json();
}

const updateStock = async (qtyAlkohol, qtyAloe, qtyHidro) => {
    const response = await fetch(`${BASE_URL}/bahan/stok`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            qty_alkohol  : qtyAlkohol,
            qty_aloevera : qtyAloe,
            qty_hidrogen : qtyHidro
        })
    });

    return await response.json();
}

exports.getStock = getStock;
exports.getRecent = getRecent;
exports.putMix = putMix;
exports.updateStock = updateStock;