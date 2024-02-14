package com.sscp.core.services.impl;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sscp.core.services.APIErrorLoggingWriterService;

@Component(immediate=true, service = APIErrorLoggingWriterService.class)
public class APIErrorLoggingWriterServiceImpl implements APIErrorLoggingWriterService {

  private static final Logger log = LoggerFactory.getLogger(APIErrorLoggingWriterServiceImpl.class);

  @Override
  public void parseHeaders(String header) {
    String errorHeaders = header;

    log.error("API Logging Service for error headers" + errorHeaders);

  }

}
