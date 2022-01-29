# NXT Submission Rules

____
A1 &mdash; Complete and serve a purpose:
> The plugin must be **complete and serve a purpose**. It is OK to have parts of the plugin not yet working, but they must be disabled by default. The other parts must serve a meaningful purpose. Plugins that fail to offer legitimate use cases will not be approved.

A2 &mdash; Serve a specific purpose:
> The plugin must serve a **specific** purpose and be useful to the majority of users. Core plugins are not accepted, because they are only useful on specific private servers. Plugins that contain many mutually irrelevant features are also not allowed, because they are a major source of bloatware.

A3 &mdash; No duplicates:
> If there is another plugin that covers every single feature your plugin has, you must not submit yours, unless the existing one has been outdated and unmaintained for more than one month. You may want to explain why your plugin is better than the existing ones in the description.

A4 &mdash; No remote code execution:
> If the plugin requires an external API, it must either be from a reputable provider (e.g. Google APIs) or has high transparency. It must be clear that the plugin cannot be used as a backdoor for hacking servers. In particular, remote code execution is strictly prohibited. This includes auto-updaters from sources other than Poggit Release.

A5a &mdash; No artificial limitations:
> Artificially created limitations in the plugin are not allowed, particularly restrictions to coerce owners into purchasing plans, licenses, subscription to unlock said self imposed features.

A5b &mdash; No unsolicited advertisement:
> The plugin must not be intentionally used as medium to advertise any external (paid or free) servers, resources and plugins, other than plugins released on Poggit, unless explicitly requested by the user (such as through a plugin help command).

A5c &mdash; Use of external API:
> External API (i.e. online ones, especially those involving HTTP(S) requests) can only be used in plugins when reasonably necessarily, such as when it involves a public database or large dataset that cannot be practically distributed to users.

A5d &mdash; Availability of external API:
> External APIs used by plugins must have a free plan with reasonable rate limit (even if just a free trial period).

A6 &mdash; Libraries and API plugins:
> Libraries must be included as virions. They must not be released as individual plugins. The only exception is when the plugin manages the compatibility among other plugins (a.k.a. API plugins), but API plugins must also have clear documentation for other plugin developers.

A7 &mdash; Only submit your own plugins:
> Send pull requests instead of submitting a new plugin. Only submit it as a new plugin if the original author is inactive or if your plugin contains major new features.

____

B1a &mdash; No unknown API versions:
> Plugins must not support **unreleased** API versions, i.e. anything not found in https://github.com/pmmp/PocketMine-MP/releases

B1b &mdash; No redundant API versions:
> Plugins must not list **redundant** API versions in the plugin.yml. Only the earliest supported API in each major version needs to be listed, e.g. `3.2.0` is not necessary if `3.1.0` is already listed.

B2 &mdash; No obfuscation:
> The source code must be readable and not obfuscated. All PHP code can eventually be deobfuscated, so there is really no point of close-sourcing them. In addition, the code must be sufficiently readable using "normal" practices, e.g. prefer arrays over numbered variable names.

B3 &mdash; No useless messages in startup/shutdown:
> Plugins must not output unnecessary status messages like "I have been enabled", "Author: Xxx", etc., unless the plugin startup/shutdown takes really much time (more than 1 second) such that the user may become impatient. See https://forums.pmmp.io/threads/clean-up-our-consoles.5656/

B4a &mdash; Default must be English:
> It is great if your plugin supports other languages, but since English is the most common languages that everyone knows, the default language must be set as English.

B4b &mdash; Political and Religious Neutrality:
> Plugins must not contain politically or religiously biased content.

B5 &mdash; Declare dependencies:
> Declare your dependencies in plugin.yml and include them in the submission form. Plugins with dependencies not released on Poggit will not be approved since they cannot be used without non-Poggit sources.

B7 &mdash; [Removed] Declare protocol:
> [This rule has been removed] Plugins using *any* item from the `pocketmine\network\mcpe` namespace must declare `mcpe-protocol` in plugin.yml

B10 &mdash; Use of hardcoded constants:
> Plugins must use methods or constants provided by PocketMine API for vanilla data where available. In particular, use the `Vanilla*` methods instead of hardcoded IDs. Parse string values with `StringTo*Parser` instead of using integer IDs.

____

C1a &mdash; Namespace format:
> All plugins must choose a **unique** namespace that will not be accidentally collided by other plugins. The plugin must begin with the author name (unless its an official plugin, because the namespace `pocketmine` is disallowed), followed by any identifier such that the author himself remembers which plugin it corresponds to. The recommended namespace format is `AuthorName\PluginName`. The author name should use one that corresponds to the GitHub username/org name to prevent collision.

C1b &mdash; Stay in your namespace:
> All classes, interfaces and traits declared by plugins must be under this unique namespace (or subnamespaces). This includes libraries bundled with the plugin. Consider using the [virion framework](https://poggit.pmmp.io/virion), which provides a convenient way of shading libraries (i.e. refactoring libraries into your plugins namespace).

C1c &mdash; Changing the namespace:
> Plugin namespace should not change once it has been submitted unless there is an enormous API change that requires changing the namespace. But developers are recommended to obsolete the old version and submit a new plugin instead.

C2a &mdash; Command fallback prefix:
> If the plugin registers commands by calling `CommandMap->register` directly, the fallbackPrefix parameter passed to the register function must be the plugin name. Plugins are not allowed to use its initials, acronyms, etc. for the fallback prefix.

C2b &mdash; Plugin-identifiable:
> All commands must implement the PluginOwned interface and return their plugin instance.

C3 &mdash; Permission names:
> If the plugin registers permissions, all permission names must start with the plugin name (does not need to contain the author name like the namespace). The permission name should only consist of alphabets, digits, hyphens and dots.

C4 &mdash; Persisted data should be namespaced:
> Plugin generic data should be saved only inside the plugin's data folder. Entity/Item-specific data should be saved inside a specific CompoundTag named with the plugin name. Externally-saved data (e.g. MySQL) should allow some configuration, preferably prefixed with plugin name, to prevent collision with other plugins.

C5 &mdash; Do not assume about command names:
> This means `dispatchCommand` must not be used unless the command template is written by the user. In future PocketMine versions, users can rename commands, and using `dispatchCommand` to call plugin functions will not work anymore.

____

D1 &mdash; Detailed description:
> The description should give an idea what the plugin is about, why it is useful, etc. Do not assume everyone knows the terminology; explain them. Do not just post screenshots or videos without explaining with text; videos are not searchable.

D2 &mdash; The description must be available in English:
> Translations are allowed, but English must be available first. We assume English as the language that most users know.

D3 &mdash; Clean description:
> Do not provide irrelevant or duplicated information in the description. See [description guide](https://github.com/poggit/support/blob/master/description-format.md) for details. Do not advertise in the description. (Leaving a reasonable number of contacts is allowed)

D4 &mdash; Beautiful description:
> Format your description properly. The [description formatting documentation](https://github.com/poggit/support/blob/master/description-formatting.md) helps formatting according to Poggit's special mechanisms like pagination.

D5 &mdash; Informative changelog:
> The changelog should be informative, in case the commit messages are not informative enough. The changelog should not contain meaningless lines like `Updated README.md`.

D6 &mdash; Pick a license carefully:
> All plugins released on Poggit must be under an open source license [as defined by OSI](https://opensource.org/osd). Licenses must be included in a LICENSE file on the repository.

____

S1 &mdash; Do not block the main thread:
> Except during startup/shutdown, plugins must avoid blocking the main thread with operations that cause the thread to wait for a signal. Apart from small-scale local file IO operations (compare with the extent used in PocketMine internals), no blocking operations (e.g. curl calls, MySQL queries, heavy SQLite calls, O(players) scanning) are allowed to be executed on the main thread, or to have the main thread wait for such operations.

S2 &mdash; SQL parameters must be escaped:
> Data must NEVER be interpolated into SQL strings using interpolation, unless they are explicitly escaped using the `mysqli::escape_string`/`SQLite3::escapeString` function. No exceptions even if you are sure they are integers, player names or validated otherwise. Using libasynql or using `bind_param()`/`bindValue()` would be even better.

S3 &mdash; No O(accounts):
> Plugins must not run code that allocates O(n) memory or above, or run on the main thread functions that take O(n) time or above, where n is a quantity that increases persistently and significantly over time, e.g. number of registered players, number of blocks placed over time, etc. In particular, storing stats for all players in a Config file is an example of violation of this rule.

S4 &mdash; Use permissions to block commands.:
> Do not use PlayerCommandPreprocessEvent/CommandEvent to block users from running commands. This is vulnerable to alias attacks and formatting attacks.
