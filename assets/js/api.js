document.addEventListener('DOMContentLoaded', async function() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    if (firstName && lastName) {
        document.getElementById('first-name').innerText = firstName;
        document.getElementById('last-name').innerText = lastName;

        try {
            const response = await axios.get(`https://v2.namsor.com/NamSorAPIv2/api2/json/origin/${firstName}/${lastName}`, {
                headers: {
                    'X-API-KEY': 'd083347e130be0bd7d1f77224285d922'
                }
            });

            console.log('API Response:', response.data);

            if (response.data) {
                const data = response.data;

                document.getElementById('country-origin').innerText = data.countryOrigin;
                document.getElementById('country-origin-alt').innerText = data.countryOriginAlt;
                document.getElementById('region-origin').innerText = data.regionOrigin;
                document.getElementById('subregion-origin').innerText = data.subRegionOrigin;
                document.getElementById('script').innerText = data.script ;

                const regionList = document.getElementById('region-list');
                regionList.innerHTML = `
                    <li>Top region of origin: ${data.topRegionOrigin}</li>
                    <li>Sub-region of origin: ${data.subRegionOrigin}</li>
                    <li>Region of origin: ${data.regionOrigin}</li>
                `;

                const countryList = document.getElementById('country-list');
                countryList.innerHTML = (data.countriesOriginTop || []).map(country => `<li>${country}</li>`).join('');

                const probabilityList = document.getElementById('probability-list');
                probabilityList.innerHTML = `
                    <li>Calibrated probability: ${(data.probabilityCalibrated * 100).toFixed(2)}%</li>
                    <li>Alternative calibrated probability: ${(data.probabilityAltCalibrated * 100).toFixed(2)}%</li>
                    <li>Score: ${data.score}</li>
                `;
            } else {
                console.error('No data found for the provided names.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please check the console for more details.');
        }
    } else {
        console.error('No name data found in local storage.');
        alert('No name data found in local storage.');
    }
});
