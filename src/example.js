import React from "react";
import {
  Switch,
  Route,
  useParams,
  HashRouter
} from "react-router-dom";
import { useState, useEffect } from 'react';
import './example.css';

export default function ParamsExample() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Route render={({ location }) => (
        <Layout location={location}>
          <Switch location={location}>
            <Route path="/:id" children={<Child />} />
          </Switch>
        </Layout>
      )} />
    </HashRouter>
  );
}

function Child() {
  let { id } = useParams();
  console.log("_id :", id);
  const [items, setItems] = useState({});
  const [filteredItems, setFilteredItems] = useState({});
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("highest");

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleQualityChange = (e) => {
    setQuality(e.target.value);
  };

  useEffect(() => {
    fetch('https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=' + id)
      .then(response => response.json())
      .then((data) => { setItems(data); setFilteredItems(data); })
  }, [id])
  useEffect(() => { setFilteredItems(items) }, [items]);

  return (<>
    <a className="hello" href="https://etrolls.in" ><center className="sticky">
      <div className="logo" >TROLL BANK</div>
      <p>View, Download, Upload , Store</p>
      <div className="bar">
        <img alt="Search" className="lens" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Google_Magnifying_Glass.svg/480px-Google_Magnifying_Glass.svg.png" title="Search by Voice" />
        <input className="searchbar" placeholder={filteredItems.title} />
        <img alt="Search by Voice" className="voice" src="https://seeklogo.com/images/G/google-mic-logo-EF440C9A6F-seeklogo.com.png" title="Search by Voice" />
      </div>
    </center></a>
    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading px-3 "><span class="text-muted">{filteredItems.title}</span></h2>
        <div className="dropcontainer">
          <label>Format</label>
          <select className="drop" value={format} onChange={handleFormatChange}>
            <optgroup label="Video">
              <option value="mp4" >mp4</option>
              <option value="mov" >mov</option>
              <option value="avi" >avi</option>
              <option value="webm" >webm</option>
              <option value="mkv" >mkv</option>
              <option value="flv" >flv</option>
            </optgroup>
            <optgroup label="Audio">
              <option>mp3</option>
              <option>wav</option>
              <option>wmv</option>
              <option>ogg</option>
              <option>aiff</option>
            </optgroup>
          </select>
          <span className="spanspace"></span>
          <label >Quality</label>
          <select className="drop" value={quality} onChange={handleQualityChange}>
            <optgroup label="Audio and video">
              <option>Highest quality</option>
              <option>Lowest quality</option>
            </optgroup>
            <optgroup label="Audio only">
              <option>Highest audio quality</option>
              <option>Lowest audio quality</option>
            </optgroup>
            <optgroup label="Video only">
              <option>Highest video quality</option>
              <option>Lowest video quality</option>
            </optgroup>
          </select>
        </div>
        <button type="button" class="buttoncontainer btn btn-primary" onClick={() => window.open("https://zvemy.sse.codesandbox.io/download?URL=https://www.youtube.com/watch?v=" + id + "&format=" + format + "&quality=" + quality, "_blank")}>
          &nbsp;
          <i class="bi bi-download"></i>
          Download
        </button>
      </div>
      <div class="col-md-5">
        <iframe key="1" title={id} width="500" height="300" src={"https://www.youtube.com/embed/" + id + "?autoplay=1&controls=1&mute=1"} />
      </div>
    </div>

  </>
  );
}
