document.getElementById("add-block-btn").addEventListener("click", () => {
    const data = document.getElementById("block-data").value;
    if (data) {
        fetch('/add_block', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updateBlockchainUI();
            document.getElementById("block-data").value = "";
        })
        .catch(error => console.error('Error:', error));
    }
});

function updateBlockchainUI() {
    fetch('/get_chain')
        .then(response => response.json())
        .then(chain => {
            const blockchainContainer = document.getElementById("blockchain-container");
            blockchainContainer.innerHTML = "";

            chain.forEach(block => {
                const blockDiv = document.createElement("div");
                blockDiv.className = "block";
                blockDiv.innerHTML = `
                    <p><strong>Index:</strong> ${block.index}</p>
                    <p><strong>Previous Hash:</strong> ${block.previous_hash}</p>
                    <p><strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString()}</p>
                    <p><strong>Data:</strong> ${block.data}</p>
                    <p><strong>Hash:</strong> ${block.hash}</p>
                `;
                blockchainContainer.appendChild(blockDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

updateBlockchainUI();
