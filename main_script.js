const url =
  "https://script.google.com/macros/s/AKfycbzDjXYbLG0SaUMK4RxTPsJoqs4bRVRnYpTWJIr-dwRp5wVz-DqZvsWOSPjqYm3bla_paw/exec";
let musicData = [];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    musicData = data;
    createDropdown(musicData);
  })
  .catch((error) => console.error(error));

function createDropdown(musicData) {
  const dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  for (let i = 0; i < musicData.length; i++) {
    const option = document.createElement("option");
    option.value = musicData[i].name;
    option.text = musicData[i].name;
    dropdown.add(option);
  }
}

function displaySelectedSong() {
  const selectedSongName = document.getElementById("dropdown").value;
  const selectedSong = musicData.find((song) => song.name === selectedSongName);

  if (selectedSong) {
    const selectedSongDetails = document.getElementById(
      "selected-song-details"
    );
    selectedSongDetails.innerHTML = `
          <h2>${selectedSong.name}</h2>
          <p>Artist(s): ${selectedSong.artist}</p>
          <p>Release Date: ${selectedSong.releaseDate}</p>
          <p>Popularity: ${selectedSong.popularity}</p>
        `;

    displaySimilarSongs(selectedSong.popularity);
  } else {
    document.getElementById("selected-song-details").innerHTML = "";
    document.getElementById("similar-songs").innerHTML = "";
  }
}

function displaySimilarSongs(targetPopularity) {
    console.log("Displaying similar songs for popularity:", targetPopularity);
  
    const similarSongs = musicData
      .filter((song) => Math.abs(song.popularity - targetPopularity) <= 10)
      .sort(
        (a, b) =>
          Math.abs(b.popularity - targetPopularity) -
          Math.abs(a.popularity - targetPopularity)
      )
      .slice(0, 5);
  
    console.log("Similar songs found:", similarSongs.length);
  
    const similarSongsContainer = document.getElementById("similar-songs");
    similarSongsContainer.innerHTML = `<h2>Similar Songs</h2>`;
  
    similarSongs.forEach((song) => {
      console.log("Song name:", song.name);
      console.log("Preview URL:", song.preview);
  
      const songElement = document.createElement("div");
      songElement.innerHTML = `
        <h3>${song.name}</h3>
        <p>Artist(s): ${song.artist}</p>
        <p>Release Date: ${song.releaseDate}</p>
        <p>Popularity: ${song.popularity}</p>
        ${
          song.preview
            ? `<audio controls><source src="${song.preview}" type="audio/mpeg"></audio>`
            : "No preview available"
        }
      `;
      similarSongsContainer.appendChild(songElement);
    });
  }
