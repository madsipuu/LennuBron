package com.madislennud.lennupiletid;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LennudService {
    private List<Lennud> lendudeList;


    public LennudService() {
        lendudeList = new ArrayList<>();

        // Lennuki loomine(max 25 rida ja max 7 kohtaReal)
        Lennuk lennuk1 = new Lennuk("Boeing 737", 15, 7);
        Lennud lend1 = new Lennud(1,"Eesti", "Soome", LocalDateTime.of(2025, 3, 15, 14, 0), 2, 100, lennuk1);
        lendudeList.add(lend1);

        // Teise lennuki ja lennu loomine
        Lennuk lennuk2 = new Lennuk("Airbus A320", 25, 6);
        Lennud lend2 = new Lennud(2,"Eesti", "Läti", LocalDateTime.of(2025, 3, 18, 10, 0), 1.5, 80, lennuk2);
        lendudeList.add(lend2);

        Lennud lend3 = new Lennud(3,"Soome", "Eesti", LocalDateTime.of(2025, 3, 15, 14, 0), 2, 100, lennuk2);
        Lennud lend4 = new Lennud(4,"Itaalia", "Eesti", LocalDateTime.of(2025, 3, 15, 14, 0), 2, 100, lennuk1);
        Lennud lend5 = new Lennud(5,"Hispania", "Eesti", LocalDateTime.of(2025, 3, 15, 14, 0), 2, 100, lennuk1);
        Lennud lend6 = new Lennud(6,"Läti", "Eesti", LocalDateTime.of(2025, 3, 15, 14, 0), 2, 100, lennuk1);
        Lennud lend7 = new Lennud(7,"Norra", "Eesti", LocalDateTime.of(2025, 3, 15, 14, 0), 2, 100, lennuk1);
        Lennud lend8 = new Lennud(8,"Eesti", "Itaalia", LocalDateTime.of(2025, 3, 14, 10, 0), 1.5, 110, lennuk2);
        Lennud lend9 = new Lennud(9,"Eesti", "Hispania", LocalDateTime.of(2025, 3, 11, 10, 0), 1.5, 120, lennuk2);
        lendudeList.add(lend3);
        lendudeList.add(lend4);
        lendudeList.add(lend5);
        lendudeList.add(lend6);
        lendudeList.add(lend7);
        lendudeList.add(lend8);
        lendudeList.add(lend9);



    }


    public List<Lennud> getLennud() {
        return lendudeList;
    }




    public void lisaLend(Lennud lend) {
        lendudeList.add(lend);
    }

    public Lennud getLendById(int planeId) {
        return lendudeList.stream()
                .filter(l -> l.getId() == planeId)
                .findFirst()
                .orElse(null); // Returns null if no flight found
    }
}