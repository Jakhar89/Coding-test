package com.sscp.core.support.services;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.CharArrayWriter;
import java.io.PrintWriter;

public class CharResponseWrapper extends HttpServletResponseWrapper {
    private final CharArrayWriter output;

    public CharResponseWrapper(HttpServletResponse response) {
        super(response);
        output = new CharArrayWriter();
    }

    @Override
    public PrintWriter getWriter() {
        return new PrintWriter(output);
    }

    @Override
    public String toString() {
        return output.toString();
    }
}