package com.madislennud.lennupiletid;

import java.util.ArrayList;
import java.util.Date;
import java.time.LocalDateTime;
import java.util.Random;

public class Lennud {
    private int id;
    private String algusKoht;
    private String sihtkoht;
    private LocalDateTime  kuupaev;
    private double aeg;
    private double hind;
    private Lennuk lennuk;
    private ArrayList<Pilet> piletid = new ArrayList<>();

    public Lennud(int id, String algusKoht, String sihtkoht, LocalDateTime  kuupaev, double aeg, double hind, Lennuk lennuk) {
        this.id = id;
        this.algusKoht = algusKoht;
        this.sihtkoht = sihtkoht;
        this.kuupaev = kuupaev;
        this.aeg = aeg;
        this.hind = hind;
        this.lennuk = lennuk;

        //piletid
        int kohtikokku = lennuk.getKohtiReal()* lennuk.getRidu();
        Random random = new Random();
        for (int i = 1; i <= kohtikokku; i++) {
            boolean onVõetud = (random.nextInt(100) > 20); // 20% chance et võetud
            Pilet pilet = new Pilet(i, id, onVõetud);
            piletid.add(pilet);
        }
    }
    public int getId() {return id;}
    public String getAlgusKoht() { return algusKoht; }
    public String getSihtkoht() { return sihtkoht; }
    public LocalDateTime getKuupaev() { return kuupaev; }
    public double getAeg() { return aeg; }
    public double getHind() { return hind; }
    public Lennuk getLennuk() { return lennuk; }
    public ArrayList<Pilet> getPiletid() { return piletid; }
}
