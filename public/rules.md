# NXT Submission Rules

## (A) About the plugin

These rules are about the concept of your plugin. Plugins which do not follow these rules will be rejected.

____

### 1a. Complete and Functional:
> Plugins must be **complete and functional**. Plugins with partial feature completion must use the experimental flag and must not list said feature in the description.

### 1b. Serves a purpose:
> Plugins must serve a purpose which cannot be replicated using PocketMine's built-in features. Plugins which are just a command aliases or a shortcut to a built-in feature will not be approved.

### 2. Serve a specific purpose:
> Plugins must serve a **specific** purpose and be useful to the majority of users. Core plugins are not accepted, because they are only useful on specific private servers. Plugins which contain many mutually irrelevant features are also not allowed, because they are a major source of bloatware.

### 3. No duplicates:
> If there is another plugin which covers every single feature your plugin has, your plugin will be rejected unless the existing one no longer supports the latest PocketMine-MP version and has been unmaintained for more than 2 weeks. You may want to explain why your plugin is better than the existing ones in the description.

### 4. No remote code execution:
> If a plugin requires an external API, it must either be from a reputable provider (e.g. Google APIs) or has high transparency. It must be clear the plugin cannot be used as a backdoor for hacking servers. In particular, remote code execution is strictly prohibited. Automatic updaters are allowed if using our own site API or project repository releases.

### 5a. No artificial limitations:
> Artificially created limitations in plugins are not allowed, particularly restrictions to coerce owners into purchasing plans, licenses, subscription to unlock any features.

### 5b. No unsolicited advertisement:
> Plugins must not be intentionally used as medium to advertise any external (paid or free) servers, resources, and/or plugins unless explicitly requested by the user (such as through a plugin command).

### 5c. Use of external API:
> External API (i.e. online ones, especially those involving HTTP(S) requests) can only be used in plugins when reasonably necessarily, such as when it involves a public database or large dataset which cannot be practically distributed to users. API calls must not be made excessively, and must be cached when possible.

### 5d. Availability of external API:
> External APIs used by plugins must have a free plan with reasonable rate limit (even if just a free trial period).

### 6a. API plugins:
> Plugins may be submitted as API plugins if they manage data or provide a service to other plugins not already managed by PocketMine.

### 6b. Libraries:
> Libraries are not allowed to be submitted as plugins. They must be submitted as a separate repository and must not be included in plugins' source code. Plugins may use composer to include libraries instead.

### 7. Only submit your own plugins:
> You may only submit plugins you have written yourself. If a user leaves a plugin abandoned or archived, you may submit a fork of it with proof of the original author's permission.


## (B) About the code

These rules are about the code in your plugin. If a plugin violates these rules, reviewers **will reject the plugin**,
and you will have to update your code before submitting a new build.

____

### 1a. No Development API versions:
> Plugins must only support released API versions on the stable branch.

### 1b. No Unofficial Software Support:
> Plugins must not advertise support for unofficial software, such as forks of PocketMine-MP.

### 2. No obfuscation:
> The source code must be readable and not obfuscated. All PHP code can eventually be deobfuscated, so there is really no point of close-sourcing them. In addition, the code must be sufficiently readable using "normal" practices, e.g. prefer arrays over numbered variable names.

### 3. No useless messages in startup/shutdown:
> Plugins must not output unnecessary status messages like "I have been enabled", "Author: Xxx", etc., unless the startup/shutdown sequence takes more than 1 full second such that the user may become impatient. See https://forums.pmmp.io/threads/clean-up-our-consoles.5656/

### 4a. Default must be English:
> The default language of plugins must be English. This is to ensure that the majority of users are able to configure plugins without having to translate the messages. Multi-language support is otherwise encouraged to use PocketMine's multi-language utility classes.

### 4b. Political and Religious Neutrality:
> Plugins must not contain politically or religiously biased content.

### 5. Declare dependencies:
> Plugins which use methods of other plugins must declare them as dependencies in both the plugin.yml and release page. This is to ensure that the plugin will not crash if the dependency is not installed. If the dependency is optional, it must be declared as soft-dependency. Dependency plugins which are not previously submitted must not be used.

### 6. Declare protocol:
> Plugins using *any* object or method from the `pocketmine\network\mcpe` namespace, forms/UI, or any other protocol-related features must declare the supported protocol versions in the plugin.yml. This is to ensure that the plugin will not crash if the protocol version is not supported.

### 7a. Use of hardcoded constants:
> Plugins must use methods or constants provided by PocketMine API for vanilla data where available. In particular, use the `Vanilla*` methods instead of `BlockFactory::get()`, `ItemFactory::get()`, `new Effect`, etc. Do not hardcode numeric or string values when constants are available. e.g. ItemIds::STICK instead of 280.

### 7b. Use StringTo*Parser methods where available:
> Parse string values with `StringTo*Parser` instead of using integer IDs where available. Data stored in configuration files must use string ids where applicable.

### 8. Unnecessary use of protocol:
> Plugins must not use packet handling to implement features which can be implemented using the API. e.g. Use `PlayerInteractEvent` instead of `InventoryTransactionPacket`.

## (C) About compatibility

These rules are here to make sure different plugins work well together. If a plugin violates these rules, reviewers 
**will reject the plugin**, and you will have to change your code before submitting a new build.

____

### 1a. Namespace format:
> All plugins must choose a **unique** namespace which will not collide with other plugins'. The namespace must begin with the author name, followed by any identifier such that the author himself remembers which plugin it corresponds to. The recommended namespace format is `AuthorName\PluginName`. The author name should use one which corresponds to the GitHub username/org name to prevent collision.

### 1b. Stay in your namespace:
> All objects and methods declared by plugins must be under your unique namespace. This includes libraries bundled with plugins. Consider using the [virion framework](https://poggit.pmmp.io/virion), which provides a convenient way of shading libraries (i.e. refactoring libraries into your plugin's namespace).

### 1c. Changing the namespace:
> Plugin namespace must not change once it has been approved. Developers are recommended to submit a new plugin instead in the case of any large changes.

### 2a. Command fallback prefix:
> If a plugin registers commands by calling `CommandMap->register` directly, the fallbackPrefix parameter passed to the register function must be the plugin name. Plugins are not allowed to use initials, acronyms, etc. for the fallback prefix.

### 2b. Plugin-owned commands:
> All commands must implement the PluginOwned interface and return their plugin instance. It's recommended to use the `PluginOwnedTrait` utility trait provided by PocketMine for easier implementation.

### 3. Permission names:
> If a plugin registers permissions, all permission names must start with the plugin name. The permission name should only consist of alphabets, digits, hyphens and dots.

### 4. Persisted data should be namespaced:
> Plugin generic data should be saved only inside a plugin's data folder. Stored NBT data must be placed inside NBT files. Externally-saved data (e.g. MySQL) should allow some configuration, and preferably be prefixed with the plugin name to prevent collision with other plugins.

### 5. Do not use hardcoded commands to perform operations:
> The `dispatchCommand` method must not be used unless a command template is written by the author. In future PocketMine versions, users can rename commands, and depending on `dispatchCommand` to call plugin functions may not work anymore.

## (D) About the submit form

These rules are about the plugin submission form. If a plugin violates these rules, reviewers **will reset the
plugin to draft**. The developer can edit the submission and **resubmit the build again**.

____

### 1. Detailed description:
> The description should give an idea what the plugin is about, why it is useful, etc. Do not assume everyone knows what you're talking about; explain it with clear detail. Screenshots or videos on their own are not enough.

### 2. The description must be available in English:
> Translations are allowed, but English must be available first. English is assumed to be the language most users know.

### 3. Clean description:
> Do not provide irrelevant or duplicate information in the description. See [description guide](https://github.com/poggit/support/blob/master/description-format.md) for details. Do not advertise in the description; though posting author contact information is allowed.

### 4. Beautiful description:
> Format your description using GitHub markdown. You may use the [Markdown Sandbox](https://jbt.github.io/markdown-editor/) to preview your description.

### 5. Informative changelog:
> Plugin updates must have a changelog. The changelog must be formatted using GitHub markdown. Changelog content must contain user-readable information about the changes made in the update. Do not include irrelevant information such as "fixed a typo" or "updated README".

### 6. Pick a license carefully:
> All plugins submitted must be under an open source license as defined by the [Software Package Data Exchange (SPDX)](https://spdx.github.io/license-list-data/). Licenses must be included in a LICENSE file in the root of the plugin. 

## (S) Security Vulnerability 

These rules are about security vulnerabilities. If a plugin violates these rules, reviewers **will reject the plugin**,
and you must change your code before submitting a new build.

____

### 1. Do not block the main thread:
> Except during startup/shutdown, plugins must avoid blocking the main thread with operations which cause the thread to wait for a signal. Apart from small-scale local file IO operations (compare with the extent used in PocketMine internals), no blocking operations (e.g. curl calls, MySQL queries, heavy SQLite calls, O(players) scanning) are allowed to be executed on the main thread, or to have the main thread wait for such operations.

### 2. SQL parameters must be escaped:
> Data must NEVER be interpolated into SQL queries using php's string interpolation without being safely escaped. Using prepared statements is the recommended way to do this.

### 3. Use permissions to block commands:
> Do not use PlayerCommandPreprocessEvent/CommandEvent to block users from running commands. This is vulnerable to command alias and formatting attacks.
