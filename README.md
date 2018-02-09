# Sitecore Helix frontend development example
A simple example that shows a very basic frontend development setup for a solution that follows the Sitecore Helix conventions. 

The example also introduce a naming convention for sass and js imports that aligns with the Sitecore Helix layer convention.

## Why?
I very often get questions on how to setup a frontend development environment that align with the layer convention in Sitecore Helix. In this example I will both show how simple it really is and also show a naming convention that is easy to adapt.
  
The example found in Habitat is unfortunately not that great and for developers not working in Visual Studio it becomes very distorted.

So this is why I made this quick example. It has already been used as an off-set on several client solutions. There is no Visual Studio projects or server-side code.

## What?
In this example I show how a common framework (in this case bootstrap 4) is used as a foundation module that your feature modules can depend on without implicit dependencies going in the opposite direction of the dependency flow in Sitecore Helix. 

The styles and scripts are compiled in specific contexts (project layer modules) where variables can be overridden - really a form of compile time dependency inversion. The compilation is composed in each context individually so these can be tailored to match the features that are used within that context and do not have to import anything else.

To enable this a simple naming convention is used to automatically map import name aliases at compile time.

Bootstrap can be replaced with any framework you'd like. As a minimum it should consist of the basic grid and theming that is used by feature modules. It should also be clear which sass variables that can be overridden by context modules.

NPM is used for all dependencies - no bower.

## Setting it up
This example has been made using Visual Studio Code only.

1. Clone repo
2. npm i
3. gulp

To use it in a real solution you will need to copy/move/merge the gulp tasks into your solution gulp file and align. Or you should just be inspired.

## Naming conventions and usage
These conventions makes it easy to lookup and manage dependencies. They also prevent name clashes with vendor packages and aligns with Sitecore Helix module naming.
### sass files


All sass files has to be located in the Styles folder in a module

    src/[Layer]/[module]/code/Styles/

Feature & Foundation module sass files:

    _[Layer]-[Modulename](-[optional other identifier]).scss, 
 
 examples, Feature-Navigation.scss, Feature-Navigation-HoverEffects.scss 
 
Project layer sass files:

Variables

    _[Modulename]-Variables(-[optional, Theme name]).scss

examples, 
 * _MyWebsite-Variables.scss
 * _MyWebsite-Variables-Dark.scss

Bundles (do not start name with _)

    [ModuleName]-[Default | Theme name].scss

examples 
* MyWebsite-Default.scss 
* MyWebsite-Dark.scss

#### Import example
```sass
// Bootstrap sass functions
@import "Foundation-Theming-Functions";

// Theme variables
@import "Corporate-Variables-Dark";

// Foundation Theming Full - all of bootstrap
@import "Foundation-Theming-Full";

// Foundation Theming Fonts - all of font-awesome, copy font files to dist folder manually for now
@import "Foundation-Theming-Fonts";

// Styling shared across several contexts but of course not used by ANY feature modules
@import "Project-Common";

// Features used/supported in this context
@import "Feature-SomeFeature";
@import "Feature-Navigation";
```

### Javascript

All script files has to be located in the Scripts folder in a module and can be .js .ts or .json

    src/[Layer]/[module]/code/Scripts/

#### Import example
```javascript
// Import Foundation-Theming > index.js - includes Bootstrap + jQuery
import * as Theming from 'Foundation-Theming'

// Import a specific file from foundation theming module
import * as ThemeSwitcher from 'Foundation-Theming/theme-switcher.js'

// Import a feature module into context (<Module>/code/scripts/index.js)
import * as Navigation from 'Feature-Navigation'

import Blah from 'Feature-Blah'
```

We can now easily utilize dependency inversion on the project layer.

```javascript

// some made up example that should be easy to get :) 

import PageState from 'Feature-PageState'
import UserContent from 'Feature-UserContent'

UserContent.registerChangeListener(PageState.setPageModified);

```
_Note_, feature modules should never ever import other feature modules. Feature modules only interact in contexts defined on the project layer.

## Defining modules in Sitecore Helix
In Sitecore Helix we define a module by a responsibility in the solution domain. A responsibility can also be seen as a specific purpose in the business or perhaps easier to grasp, a specific role of a person. 

This is to ensure that everything that has the same reason to change reside within the same module and only what has the same reason to change. The benefits of this separation is significant. For example, it helps prevent deadlocks in the code-base where entangled responsibilities makes it time-consuming or even impossible to make a change one place without affecting other parts of the solution (what is commonly known as spaghetti-code scenarios). It also ease teamwork, talking with the client, introducing new devs to the solution, locating code, bugfixing and much more.

#### a really simple Helix module explanation 
Let's say that the website you are implementing has to show f. ex both some press releases and scientific papers. 

From a first impression both of these presentations really just look like content and the design overlaps quite a lot. 

But within the client organization there is a group of scientist responsible headed by one manager for the scientific papers and a press manager from the marketing team responsible for the press releases. 2 different roles within the organization with 2 very different responsibilities. 

So even though the mockup lorem-ipsum design right now looks similar then we can safely presume that the requirements for how the scientific papers and press releases are presented will evolve independent from one another in the future due to the different needs from the 2 roles responsible.

To cater for this and ensure that we do not end up entangling our code base into spaghetti we create a feature module for each responsibility - one for scientific papers and one for press releases. 

These 2 features do share a few things, they rely on the same grid, the same basic styling and so on so. This is a constraint where we know that if the grid changes it will change for both of these feature modules thus making the grid a shared responsibility. We abstract this shared responsibility of theming into a module that can be used by both feature modules- a foundation layer module. The concrete implementations that relies on the shared styles and grid can still be extended and deviate between the feature modules. This is where a common framework such as Bootstrap or Zurb Foundation fits in perfect even though these also might contain a lot that is not needed by any features (cherry-picking has become easier though). 

This way of thinking in business responsibilities diverge quite a lot from how most typical client side implementation of a design is structured. Here the focus is often more on the visual components and their underlying elements. The world seen from a pure developer perspective. This is a header, this is a button on a slider etc. making the focus in the code align with concrete technicalities, page types, visualizations or similar rather than on the features perceived by the users. This technology-centric structure makes perfect sense in developer frameworks but this changes when the implementation is made for a specific business domain. Here we need to structure by responsibilities as seen by the business to prevent entangling our implementations. The look of a button can have very different reasons to change dependent on where it is used and at some point it has to change one place but not the other.


Notice that what responsibilities are depends on the users of your solution - the Sitecore Helix conventions are for building business-centric solutions on Sitecore. If you are developing a customer-agnostic API for other developers to use you should probably rather think of different developer intents or perhaps even different technologies as being what is most likely to change together, thereby using this as an offset for defining your modules.  and not try to come up with something imaginary to match the Helix conventions.


## Discussion
__Why use NodeSass, Gulp and Webpack?__
I had to use this in an existing Gulp setup. It is easy to get rid of Gulp and just use npm and webpack or whatever you like. It is the concepts and naming conventions that are important. Not the choice of tooling.

__What if I do not want to bundle everything?__
Bundling is so last year now we have browser module support, HTTP 2.0 and so on.
This is just an example. You can make a few changes to the Gulp tasks and make it output a single file per input file, or per module, or create as many "sub"-bundles for a context module as you'd like. 

This example do not care about bundling, build time or optimizing. It is only made to show  how you can control the dependency direction in client side resources and thereby prevent implicit acyclic dependencies between modules - basically the intention is to show how you can prevent client side spaghetti in a solution that follows the Sitecore Helix conventions. 

__Why not Yarn (or some-other-package-manager) instead of npm?__
To be honest I am just not hip enough yet. I like npm and npm being part of nodejs makes it a safe choice.

__Anything else?__
Comment here, make a pull request or catch me on the Sitecore Community Slack @anderslaub

> __Disclaimer__; I am a software developer who's primary focus is on architecting and developing Sitecore based web-solutions for clients. 
> I do not label or limit myself as neither a frontend, nor a backend developer. I tend to advocate against using these fixed boxes and instead replace them with more>  granular roles based on interests and expertise. 
> This example might be lacking in the eyes of someone who work exclusively with writing js and sass on a daily basis but I do hope it is sufficient as an example. I welcome any input, comments and contributions. 