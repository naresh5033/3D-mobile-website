### 3D mobile Shopping website

- this is a react 3D mobile website project, similar to the apple site.
- some of the packages i we used in this are Vite(for the dev svr), webgi, types/three etc

# 3D model (WebGi)

- there are plenty of sites out there, we can find our 3d model, for this i ve grabbed the model from the sketchfab site, and we can search and select the model that we want and download that as in GLB format.
- Once we download our model we can go to the "webGi SDK- A 3d model viewer framework focussed on the photo-realistic rendering and developing ease.
- we can simply import our 3d model in that viewer .
- this could be useful for bunch of things for ex we can remove the shadow or the ground reflection of our obj.
- and we can define the initial position of our obj(in camera view)
- once we done with the changes again export that as in glb format

- in the webgi starter code template, grab the file and lets make some change.

# Try me

- The Try me btn is the preview of our model where the users will ve controls over the obj
- to impl this we need to ve a event listener, once we click it will fire up the parent comp(app.js), which will then fire up another fn ie webgi viewer comp.
- note: as we know in order to reference a fn from the another comp we ve to use forwardRef()

- In the preview mode we can be able to rotate the model, we ve to set the controls to true.
- once we done with the preview we can be able to exit(btn) from the preview.

# Resposive design

- finally lets make this site as break pt to the mobile dev.

  # Optimizing(loader)

  - currently the site is heavy, ie the performance is a concern with the heavy animations
  - so we wana give some time to the website to load itself(assets), and displays some nice aniamation for the users.
  - so that they don't ve to wait and look for the loadings,
  - for that we can create a "loader component"

# deployment

- the project has been deployed in the netlify.com and the link is "https://3d-mobile-website.netlify.app/"
