package com.madislennud.lennupiletid;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Luba frontendil ligi pääseda
public class LennudController {

    //veebi lehe htmli väljakutse
    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    private final LennudService lennudService;


    public LennudController(LennudService lennudService) {
        this.lennudService = lennudService;
    }




    @GetMapping
    public List<Lennud> getLennud() {
        return lennudService.getLennud();
    }

    @GetMapping("/alates")
    public List<String> getDepartureLocations() {
        return lennudService.getLennud()
                .stream()
                .map(Lennud::getAlgusKoht) // Extract departure locations
                .distinct() // Remove duplicates
                .toList();
    }





}
