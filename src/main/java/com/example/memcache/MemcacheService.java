package com.example.memcache;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class MemcacheService {

    MemcacheRepository cache;
    HashBuilder hashBuilder;

    public MemcacheService() throws NoSuchAlgorithmException {
        this.cache = new MemcacheRepository();
        this.hashBuilder = new HashBuilder();
    }

    public Optional<byte[]> get(String repository, String objectId) {
        String key = generateKey(repository, objectId);
        return Optional.ofNullable(cache.get(key));
    }

    public Map<String, String> set(String repository, byte[] data) {
        String id = hashBuilder.generateId(data);
        String key = generateKey(repository, id);

        cache.create(key, data);

        Map<String, String> response = new HashMap<>();
        response.put("oid", id);
        response.put("size", String.valueOf(data.length));

        return response;
    }

    public boolean delete(String repository, String objectId) {
        String key = generateKey(repository, objectId);
        return cache.delete(key);
    }

    private String generateKey(String repository, String objectId) {
        return String.format("%s/%s", repository, objectId);
    }
}