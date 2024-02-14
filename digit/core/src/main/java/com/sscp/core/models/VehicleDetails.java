package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.GlobalConfigurationService;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;

/**
 * Vehicle Details Component
 */
@Model(
    adaptables = {SlingHttpServletRequest.class, Resource.class},
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
    resourceType = "sscp/components/vehicledetails"
)
@Exporter(name = "jackson", extensions = "json")
public class VehicleDetails {

    @OSGiService
    @Self
    private GlobalConfigurationService globalConfig;

    @ValueMapValue
    private String vehicleDetailsLabelText;

    @ValueMapValue
    private String makeLabelText;

    @ValueMapValue
    private String modelLabelText;

    @ValueMapValue
    private String variantLabelText;

    @ValueMapValue
    private String variantCaptionText;

    @ValueMapValue
    private String yearLabelText;

    @ValueMapValue
    private String vinLabelText;

    @ValueMapValue
    private String vinCaptionText;

    @ValueMapValue
    private String engineNumLabelText;

    @ValueMapValue
    private String vehicleRegNumLabelText;

    @ValueMapValue
    private String vehicleRegStateLabelText;

    @JsonIgnore
    private String json;

    @PostConstruct
    protected void init() {
        this.json = new GsonBuilder().create().toJson(this);
    }

    public String getVehicleDetailsLabelText() { return this.vehicleDetailsLabelText; }

    public String getMakeLabelText() { return this.makeLabelText; }

    public String getModelLabelText() { return this.modelLabelText; }

    public String getVariantLabelText() { return this.variantLabelText; }

    public String getVariantCaptionText() { return this.variantCaptionText; }

    public String getYearLabelText() { return this.yearLabelText; }

    public String getVinLabelText() { return this.vinLabelText; }

    public String getVinCaptionText() { return this.vinCaptionText; }

    public String getEngineNumLabelText() { return this.engineNumLabelText; }

    public String getVehicleRegNumLabelText() { return this.vehicleRegNumLabelText; }

    public String getVehicleRegStateLabelText() { return this.vehicleRegStateLabelText; }

    public String getJson() { return json; }
}
