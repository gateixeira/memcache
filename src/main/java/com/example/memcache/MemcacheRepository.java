package com.example.memcache;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<Map<String, String>> list(String repository) {
        return dataStorage.entrySet().stream()
            .filter(entry -> entry.getKey().startsWith(repository + "/"))
            .map(entry -> {
                Map<String, String> map = new HashMap<>();
                map.put("key", entry.getKey());
                map.put("value", new String(entry.getValue()));
                return map;
            })
            .collect(Collectors.toList());
    }
}
