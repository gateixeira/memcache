package com.example.memcache;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.HttpHeaders;

@RestController
@RequestMapping("/memcache")
public class MemcacheController {

    @Autowired
    private MemcacheService memcacheService;

    @GetMapping("/{repository}/{objectId}")
    public ResponseEntity<byte[]> get(@PathVariable("repository") String repository, @PathVariable("objectId") String objectId) {
        Optional<byte[]> data = memcacheService.get(repository, objectId);

        if (data.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<byte[]>(data.get(), headers, HttpStatus.OK);
    }

    @PostMapping(value = "/{repository}", consumes = {MediaType.APPLICATION_OCTET_STREAM_VALUE})
    public ResponseEntity<Map<String, String>> set(@PathVariable("repository") String repository, @RequestBody byte[] data, UriComponentsBuilder builder) {
        Map<String, String> response = memcacheService.set(repository, data);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/" + repository + "/{objectId}").buildAndExpand(response.get("oid")).toUri());

        return new ResponseEntity<>(response, headers, HttpStatus.CREATED);
    }

    @DeleteMapping("/{repository}/{objectId}")
    public ResponseEntity<Object> delete(@PathVariable("repository") String repository, @PathVariable("objectId") String objectId) {
        if(memcacheService.delete(repository, objectId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}