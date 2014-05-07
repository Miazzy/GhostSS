# GhostSS - Sandstorm port of Ghost 

This is an initial port of Ghost to the private alpha version of the [Sandstorm personal cloud platform](https://sandstorm.io/).

Ghost is a beautifully crafted extensible CMS/site creation system which runs very well in the cloud.  Sandstorm promises to restore personal privacy and confidentiality to all - even in massively scaled cloud plaforms. 

Marry the two and you can enjoy the best of both worlds.  

## Porting Notes

* All http traffic is tunneled through capnproto (an RPC and object serialization protocol) in Sandstorm.  The tunnel does not support custom headers such as X-CSRFToken.  As a result, Ghost's X-CSRFToken handling is disabled.  Sandstorm will have its own cross site scripting protection mechanism.
* Ghost is designed to host "LIVE" pages  that are dynamically  generated and  served at request time by the Ghost server.  Sandstorm's model for hosted sites is static.  As a result, a Ghost site must be "published" (convert to static pages) before it can be served from Sandstorm.
* There is no direct user access to the underlying file system in Sandstorm.  As a result, arbitrary Ghost theme installation is not possible. A set of starter MIT licensed theme is included with the initial port.    
* Ghost and Sandstorm each has its own, incompatible, users management and security models (in the case of Ghost, there are multiple).  This initial port deploys Ghosts in single user unprotected mode, and let Sandstorm handles user/security.  

## About the repository 

This repository contains only the changes made to the Ghost source code.   Other work involved in creating the Sandstorm alpha 
installable is not part of this repository.  

The Sandstorm development team is currently working on application creation/bundling tools that will make the process substantially 
simpler - and more friendly to revision control. 


# About [Ghost](https://github.com/TryGhost/Ghost) 

Ghost is a free, open, simple blogging platform that's available to anyone who wants to use it. Lovingly created and maintained by [John O'Nolan](http://twitter.com/JohnONolan) + [Hannah Wolfe](http://twitter.com/ErisDS) + an amazing group of [contributors](https://github.com/TryGhost/Ghost/contributors).

Visit the project's website at <http://ghost.org> &bull; docs on <http://docs.ghost.org>.


## Ghost Copyright & License

Copyright (c) 2013-2014 Ghost Foundation - Released under the [MIT license](LICENSE).

## Additinal License

GhostSS modifications Copyright (c) 2014 @Sing-Li - Released under the [MIT license](LICENSE).
