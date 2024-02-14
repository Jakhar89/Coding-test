package com.sscp.core.services.datasource;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@XmlRootElement(name="suburb")
@XmlAccessorType(XmlAccessType.FIELD)
public class Suburb {
    private String suburb;
    private String postcode;
    private String state;
}
