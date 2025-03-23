package com.madislennud.lennupiletid;

public class Lennuk {
    //iga lennuki väljapääs on esimese rea ees
    private String nimi;
    private int ridu;
    private int kohtiReal;

    public Lennuk(String nimi, int ridu, int kohtiReal) {
        this.nimi = nimi;
        this.ridu = ridu;
        this.kohtiReal = kohtiReal;
    }

    public String getNimi() {
        return nimi;
    }

    public int getKohtiReal() {
        return kohtiReal;
    }

    public int getRidu() {
        return ridu;
    }
}
