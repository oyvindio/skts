Single Key Tab Switch
=====================

What?
-----
### In a nutshell
Single Key Tab Switch brings the 'Single-key shortcuts' feature of [Opera] [1]
to [Mozilla Firefox] [2], letting you use (by default), 1 and 2 to go to 
previous and next tab, respectively.

### Configuration
The hotkeys can be configured by editing these properties in `about:config`:

    extensions.skts.prevTabKey
    extensions.skts.nextTabKey

By default, these are set to `1` and `2`, respectively, but can be set to any
*single* character. The key corresponding to that character will then be the
key to press to go to the previous or next tab.

NOTE: *Firefox needs to be restarted for changes to the properties to apply.*

How?
----
If you just want to try out the add-on, you should get it from [AMO] [3]
(see Where?). 

To package the extension for testing, run `mkxpi.sh`, or (if you lack a shell),
create a zip file containing the files in `src/`, and change the file extension
from `.zip` to `.xpi`. You can then drag the `.xpi` into the Add-ons window in
Firefox to install it. 

Where?
------
The add-on can be downloaded from [AMO] [3], but is currently in the sandbox.
This means that the add-on is tagged as experimental. If you think the add-on
is the best thing since sliced bread, feel free to write a review for it on 
AMO to help it get out of the sandbox.

[1]: http://www.opera.com   "Opera Browser"
[2]: http://www.firefox.com "Mozilla Firefox"
[3]: https://addons.mozilla.org/en-US/firefox/addon/12363/ "Single Key Tab Switch"
