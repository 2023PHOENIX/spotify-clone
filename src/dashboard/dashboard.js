import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../common";


function onProfileClick(event) {
    event.stopPropagation();

    const profileMenu = document.querySelector("#profile-menu");
    profileMenu.classList.toggle("hidden");
    if (!profileMenu.classList.contains("hidden")) {
        profileMenu.querySelector("li#logout").addEventListener("click", logout);
    }
}
async function loadUserProfile() {

    const defaultImage = document.querySelector("#default-image");
    const profileButton = document.querySelector("#user-profile-btn");

    const displayNameElement = document.getElementById("display-name");

    const { display_name: displayName } = await fetchRequest(ENDPOINT.userInfo);


    // get the all data..  
    displayNameElement.textContent = displayName;

    // if(images?.length){
    //     defaultImage.classList.add("hidden");
    // }else{
    //     defaultImage.classList.remove("hidden");
    // }

    profileButton.addEventListener("click", onProfileClick);

    // displayNameElement.textContent = displayName;

}

function onPlayListItemClicked(event) {
    // console.log(event.target);
}

async function laodFeaturedPlaylist() {
    const { playlists: { items } } = await fetchRequest(ENDPOINT.featuredPlaylist);

     let playListSection = document.getElementById("featured-playlist-items");
    for (let { name, images, description, id } of items) {
        const playlistItem = document.createElement("section");
        playlistItem.className = "rounded border-2 border-solid p-4 hover:cursor-pointer";
        playlistItem.id = id;
        playlistItem.setAttribute("data-type","playlist");

        playlistItem.addEventListener("click", onPlayListItemClicked);


        const [image] = images;
       playlistItem.innerHTML = `<img
          src=${image.url}
          alt="${name}"
          class="rounded mb-2 object-contain shadow"
        />
        <h2 class="text-sm">${name}</h2>
        <h3 class="text-xs">${description}</h3>`;

        // playListItems.appendChild(playlistItem);
        playListSection.appendChild(playlistItem)
    }



    // console.log(featuredPlaylist);
}
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    laodFeaturedPlaylist();
    document.addEventListener("click", () => {
        let menu = document.getElementById("profile-menu");
        if (!menu.classList.contains("hidden")) {
            menu.classList.add("hidden");
        }
    })
});