import React, { useState } from "react";
import { StyledRegisterVideo } from "./styles";
import { videoService } from '../../services/videoServices.js';
import { createClient } from "@supabase/supabase-js";

function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues);

  return {
    values, handleChange(e) {
      const value = e.target.value;
      const name = e.target.name;
      setValues({ ...values, [name]: value });
    },
    clearForm() {
      setValues({});
    }
  }
}

export default function RegisterVideo() {
  const form = useForm({ initialValues: { titulo: '', url: '', playlist: '',} });
  const [formVisivel, setformVisivel] = useState(false);
  const PROJECT_URL = 'https://fwrkrlbgrdsacsjzjyfp.supabase.co'
  const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cmtybGJncmRzYWNzanpqeWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODk1OTIsImV4cCI6MTk4Mzk2NTU5Mn0.TNKw_ndwn1A4rWkNu-0tNCfjKWJ72swLcBCDFKU79o4'
  const supabase = createClient(PROJECT_URL, PUBLIC_KEY)
  const service = videoService();

  function displayForm() {
    setformVisivel(!formVisivel)
  }

  function onSubmit(e) {
    e.preventDefault();

    supabase.from('video').insert({
      title: form.values.titulo,
      url: form.values.url,
      thumb: service.getThumbnail(form.values.url),
      playlist: form.values.playlist
    })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })

    displayForm();
    form.clearForm()
  }

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={displayForm}>+</button>
      {formVisivel && (
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <a href={form.values.url} key={form.values.url}>
                <img src={service.getThumbnail(form.values.url)} alt="video" />
              </a>
            </div>
            <button type="button" className="close-modal" onClick={displayForm}>X</button>
            <input placeholder="Titulo do vídeo" name="titulo" value={form.values.titulo} onChange={form.handleChange} required />
            <input placeholder="URL" value={form.values.url} name="url" onChange={form.handleChange} required />
            <input placeholder="Playlist" value={form.values.playlist} name="playlist" onChange={form.handleChange} required />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  )
}      
