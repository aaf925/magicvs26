package com.magicvs.backend.controller;

import com.magicvs.backend.dto.NewsDto;
import com.magicvs.backend.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public List<NewsDto> getNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/last-updated")
    public Map<String, LocalDateTime> getLastUpdated() {
        return Map.of("date", newsService.getLastUpdateDate());
    }

    @PostMapping("/scrape")
    public void manualScrape() {
        newsService.fetchAndSaveNews();
    }
}
