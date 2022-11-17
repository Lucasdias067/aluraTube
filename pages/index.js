import config from '../config.json';
import styled from 'styled-components';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/styles/Timeline';
import Banner from '../src/assets/Banner.jpg'
import React, { useEffect, useState } from 'react';
import { Reset } from '../src/components/Menu/Reset';
import { videoService } from '../src/services/videoServices';

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = useState('');
  const [playlists, setPlaylists] = useState({});
  const service = videoService();

  useEffect(() => {
    service
      .getAllVideos(setPlaylists)
  }, []);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        {Object.keys(playlists).length
          ? <Timeline playlists={playlists} valorDoFiltro={valorDoFiltro} />
          : <Timeline playlists={config.playlists} valorDoFiltro={valorDoFiltro} />}
        <Reset />
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img{
    width: 100%;
    height: 250px;
  }

  section img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <img src={Banner.src} width={Banner.width} height={Banner.height} />
      <section className='user-info'>
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.description}</p>
        </div>
      </section>
    </StyledHeader>
  )
} config

function Timeline({ playlists, valorDoFiltro }) {
  const playlistNames = Object.keys(playlists)
  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = playlists[playlistName]
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter(video => {
                return video.title.toLowerCase().includes(valorDoFiltro.toLowerCase())
              }).map(video => {
                return (
                  <a href={video.url} key={video.url}>
                    <img src={video.thumb} alt="video" />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}