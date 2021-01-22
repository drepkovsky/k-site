# k-site

KSite is a react, bootstrap-like component library used for an easier static page creation.
KSite was build upon styled-components.


## Install
```
npm install @drepkovsky/k-site --registry=https://npm.pkg.github.com/
```
###Recommended
```
npm install styled-components bootstrap
```
## Usage
To successfuly implement k-site you must wrap your app in a KSite wrapper component.
A KPage component is a wrapper for a single page on your site, by giving it **name** and **route** props,
your KPage would be recognized by the router. And your **route** prop, will be used as a url relative to your site domain.
**route** and **name** props are also used by KSection component.By giving your KSection component a **route**, the route will be used as a id of the section
```
import {KSite,KPage} from "@drepkovsky/k-site"

function App() {
    
    return <KSite>
              <KPage name="Home" route="/">
                <KSection name="About" route="/#about" /> 
                .....
                </KSection>
              </KPage>
      </KSite>
 
}

```
