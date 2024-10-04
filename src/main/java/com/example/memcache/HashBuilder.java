package com.example.memcache;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.tomcat.util.buf.HexUtils;

public class HashBuilder {
    MessageDigest messageDigest;
    
    public HashBuilder() throws NoSuchAlgorithmException {
        this.messageDigest = MessageDigest.getInstance("SHA-256");
    }

    public String generateId(byte[] data) {
        return HexUtils.toHexString(messageDigest.digest(data));
    }
}
