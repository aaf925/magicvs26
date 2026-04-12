package com.magicvs.backend.controller;

import com.magicvs.backend.model.MetaDeck;
import com.magicvs.backend.repository.MetaDeckRepository;
import com.magicvs.backend.service.MetaScrapingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/meta")
@org.springframework.web.bind.annotation.CrossOrigin(origins = "http://localhost:4200")
public class MetaController {

    @Autowired
    private MetaDeckRepository metaDeckRepository;

    @Autowired
    private MetaScrapingService metaScrapingService;

    @GetMapping
    public List<MetaDeck> getMetagame() {
        return metaDeckRepository.findAll(Sort.by(Sort.Direction.ASC, "tier"));
    }

    @PostMapping("/sync")
    public ResponseEntity<String> forceSync(@RequestParam(defaultValue = "30") String days) {
        metaScrapingService.syncMetagame(days);
        return ResponseEntity.ok("Sincronización manual ejecutada. Revisa los logs del servidor para ver posibles detalles de error o conteo.");
    }
}
