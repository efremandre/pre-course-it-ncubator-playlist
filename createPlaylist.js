import {createElement} from "./createElement.js";

const createCoverPlaylist = (data) => {
    const div = createElement('div', 'playlist-cover-wrapper');
    const playlistImageElement = createElement('img', 'playlist-cover');
    playlistImageElement.src = data.coverImageUrl;
    div.append(playlistImageElement);
    return div;
}

const createSubtitlePlaylist = () => {
    const div = createElement('div', 'playlist-subtitle-wrapper');
    const playlistSubtitle = createElement('span', 'playlist-subtitle');

    playlistSubtitle.innerHTML = `Playlist`;
    div.append(playlistSubtitle)
    return div;
}

const createTitlePlaylist = (data) => {
    const div = createElement('div', 'playlist-title-wrapper');
    const playlistTitle = createElement('h2', 'playlist-title');

    playlistTitle.innerHTML = `${data.title}`
    div.append(playlistTitle);
    return div;
}

const createTimeAndCountPlaylist = (data) => {
    const div = createElement('div', 'playlist-duration-count-wrapper');
    const count = createElement('span', 'playlist-count');
    const duration = createElement('span', 'playlist-duration');

    const minutes = Math.floor(data.info.totalTracksDurationInSeconds / 60);
    const seconds = Math.floor(data.info.totalTracksDurationInSeconds % 60);

    count.innerHTML = `${data.info.totalTracksCount} tracks, `;
    duration.innerHTML = `${minutes}m ${seconds}s`;

    div.append(count, duration);
    return div;
}

const createListArtist = (data) => {
    const div = createElement('div', 'list-artist-wrapper');
    const ul = createElement('ul', 'list-artist');

    const setLength = (step, data, ul) => {
        for (let i = 0; i < step; i++) {
            const li = createElement('li', 'list-artist-item');
            const a = createElement('a', 'list-artist-link');
            a.innerText = `${data.tracks[i].artistName},`;
            a.href = `#${data.tracks[i].artistName}`;
            li.append(a)
            ul.append(li);
        }

        const li = createElement('li', 'list-artist-item other');
        li.innerText = 'and others';

        ul.append(li);
        div.append(ul);

        return div;
    }

    if (data.tracks.length < 3) {
        setLength(data.tracks.length, data, ul);
    } else if (data.tracks.length >= 3) {
        setLength(3, data, ul);
    }

    div.append(ul)
    return div;
}

const createInfoPlaylist = (data) => {
    const divWrapper = createElement('div', 'playlist-info-wrapper');
    const div = createElement('div', 'playlist-info');
    const subtitlePlaylist = createSubtitlePlaylist();
    const playlistTitle = createTitlePlaylist(data);
    const timeAndCountPlaylist = createTimeAndCountPlaylist(data);
    const listArtist = createListArtist(data);

    div.append(playlistTitle, timeAndCountPlaylist, listArtist);
    divWrapper.append(subtitlePlaylist, div);
    return divWrapper;
}

const renderHeaderPlaylist = (data) => {
    const div = createElement('div', 'playlist-header');
    const playListCover = createCoverPlaylist(data);
    const playListInfo = createInfoPlaylist(data);
    div.append(playListCover, playListInfo);
    return div;
}

const createTrackList = (data) => {
    let tracksListElement = document.createElement('ul');

    if (data.tracks.length) {
        const tracksEl = data.tracks.map(track => {
            const li = createElement('li', 'tracklist-item');
            const divCover= createElement('div', 'track-cover-wrapper');

            const coverTrack = createElement('img', 'track-cover');
            const div = createElement('div', 'audio-wrapper');
            const divTitle = createElement('div', 'track-title-wrapper');
            const h3 = createElement('h3', 'track-title');
            const spanInTitle = createElement('span', 'track-name');
            const audio = createElement('audio', 'track-audio');
            const spanLabel = createElement('span', 'hot-wrapper');
            const labelImg = createElement('img', 'hot-img');

            coverTrack.src = `${track.coverImageUrl}`;

            labelImg.src = `${data.label}`;
            const isHot = track.isHot;
            const setIsHot = isHot ? spanLabel : '';
            spanLabel.append(labelImg);

            const infoAboutTrack = `${track.artistName} - `;
            spanInTitle.innerText = `${track.title}`;
            h3.append(infoAboutTrack, spanInTitle);
            divTitle.append(setIsHot, h3);

            audio.setAttribute('controls', 'controls')
            audio.src = `${track.fileUrl}`;

            divCover.append(coverTrack);
            div.append(divTitle, audio);

            li.append(divCover, div);

            tracksListElement.append(li);
        });
    } else {
        tracksListElement.innerHTML = 'Track list is empty...';
    }

    return tracksListElement;
}

export const renderPlaylist = (data) => {
    const app = document.querySelector('.app');

    if (data.length) {
        data.map(el => {
            const playListWrapper = createElement('div', 'playlist-wrapper');
            const headerPl = renderHeaderPlaylist(el);
            const trackList = createTrackList(el);
            playListWrapper.append(headerPl, trackList);
            app.append(playListWrapper);
        })
    } else {
        const playListWrapper = createElement('div', 'playlist-wrapper');
        playListWrapper.innerText = 'Playlist list is empty...';
        app.append(playListWrapper);
    }

}