# k-site

KSite is a react, bootstrap-like component library used for an easier static page creation.
KSite was build upon styled-components.


## Install
```
npm install @drepkovsky/k-site --registry=https://npm.pkg.github.com/
```
### Recommended
```
npm install styled-components bootstrap
```
## Usage
To successfuly implement k-site package in your project you should wrap your app in a KSite wrapper component.
The only prime descendant of KSite component should be a KPage component.
KPage component is used as a wrapper for a single page on your site.
By giving it **name** and **route** props, KPage component would be recognized by KSite, and added to the KSite router. 
The **route** prop of KPage, will be used as an url relative to your site domain.
**Route** and **name** props are also used by KSection components. 
By giving your KSection component a **route** prop, you are assigning an ID to the given section.
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
## More documentation coming soon...
