
const BIN_ID = "69919c51d0ea881f40bbeffd";
const MASTER_KEY = "$2a$10$rbO6cOJC8rJ4N9UQHVKWD.s6kj4c0D4srlldGNZ1dcndo9VG2Jiim";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

async function testConnection() {
    console.log("Testing JSONBin Connection...");
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'X-Master-Key': MASTER_KEY,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`Status: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Body:", text);
            return;
        }

        const data = await response.json();
        console.log("Success! Data retrieved:");
        console.log(JSON.stringify(data.record, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

testConnection();
