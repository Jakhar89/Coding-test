package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;

/**
 * Notification Banner Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/notificationbanner"
)
@Exporter(name= "jackson", extensions = "json")
public class NotificationBanner {

	@ValueMapValue
	private String notificationId;

	@ValueMapValue
	private Boolean isNotificationHasNoLimit;

	@ValueMapValue
	private String notificationType;

	@ValueMapValue
	private String notificationDescription;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getNotificationId() { return notificationId; }

	public Boolean getIsNotificationHasNoLimit() { return isNotificationHasNoLimit; }

	public String getNotificationType() { return notificationType; }

	public String getNotificationDescription() { return notificationDescription; }

	public String getJson() { return json; }
}
