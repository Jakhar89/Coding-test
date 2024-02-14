var SlingSettingsService = Packages.org.apache.sling.settings.SlingSettingsService;

use(function () {
    return sling.getService(SlingSettingsService).getRunModes().contains("author");
});