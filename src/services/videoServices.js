import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://fwrkrlbgrdsacsjzjyfp.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cmtybGJncmRzYWNzanpqeWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODk1OTIsImV4cCI6MTk4Mzk2NTU5Mn0.TNKw_ndwn1A4rWkNu-0tNCfjKWJ72swLcBCDFKU79o4'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
  return {
    getAllVideos(setPlaylists) {
      supabase.from('video')
        .select('*').then((dados) => {
          const novasPlaylists = {};
          dados.data.forEach((video) => {
            if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
            novasPlaylists[video.playlist] = [
              video,
              ...novasPlaylists[video.playlist],
            ];
          });
          setPlaylists(novasPlaylists);
        });
    },
    getThumbnail(url) {
      return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
    }
  };
}