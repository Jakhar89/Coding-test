package com.sscp.core.servlets;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.commons.io.IOUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.sscp.core.services.APIErrorLoggingWriterService;
	

@Component(service=Servlet.class,property={"service.description" + "=API Error Logging","sling.servlet.methods=" + "POST",
"sling.servlet.paths="+ "/bin/sscp/apilogging","sling.servlet.paths="+ "/api/sscp/apilogging"})
public class APILogging extends SlingAllMethodsServlet {

    private static final long serialVersionUID =  1L;

    @Reference
    APIErrorLoggingWriterService apiErrorLoggingWriterService;

    @Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {

        apiErrorLoggingWriterService.parseHeaders(IOUtils.toString(request.getReader()));
    }
}