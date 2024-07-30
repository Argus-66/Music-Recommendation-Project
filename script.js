const token = 'BQCjJuLWcFrjyeDYiwHuzkzsh8QCyD8H_qid1VGMIGX4OUnYWo53UyZEYWk_dEzqUVtY44q0BhEhbXAlFsU6Lqshu1oUDirnTaP0mBIWUD7KIAg73FIoxjttspio8sigKj_27YHHq4Q5McG9HGRrYk8E6pNlAwN-V7wSoUf3D7gF80Cea3xe8FnjjyQR1ySMG6CDyFteJAXwFME2URJyZ48yWe9xjTVVKJiJrLAlrHepre2kGax7un3-yba4tkFGJCP4nluNHzsDYFfcRQ-9o1MG';

async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

async function getTopTracks() {
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    )).items;
}

async function displayTopTracks() {
    const topTracks = await getTopTracks();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = topTracks.map(
        ({ name, artists }) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    ).join('<br>');
}

// Call the displayTopTracks function to display the top tracks on the page
displayTopTracks();