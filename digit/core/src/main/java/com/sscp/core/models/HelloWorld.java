package com.sscp.core.models;

public interface HelloWorld {
    default String getMessage() {
        throw new UnsupportedOperationException();
    }
}
