package com.example.memcache;

import java.util.HashMap;
import java.util.Map;

public class MemcacheRepository {
    Map<String, byte[]> dataStorage = new HashMap<>();

    public boolean create(String key, byte[] data) {
        if (dataStorage.containsKey(key)) {
            return false;
        }
        dataStorage.put(key, data);
        return true;
    }

    public boolean delete(String key) {
        if (!dataStorage.containsKey(key)) {
            return false;
        }
        dataStorage.remove(key);
        return true;
    }

    public byte[] get(String key) {
        if (!dataStorage.containsKey(key)) {
            return null;
        }
        return dataStorage.get(key);
    }
}
