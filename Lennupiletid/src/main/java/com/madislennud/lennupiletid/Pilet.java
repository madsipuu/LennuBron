package com.madislennud.lennupiletid;

public class Pilet {

    private int kohaNumber;
    private int id;
    private boolean vaba;

    //vb peab siia veel lisama midagui nagu lend aga idk veel
    public Pilet(int kohaNumber, int id, boolean vaba) {
        this.kohaNumber = kohaNumber;
        this.id = id;
        this.vaba = vaba;
    }

    public Pilet(int kohaNumber, int id) {
        this.kohaNumber = kohaNumber;
        this.id = id;
        this.vaba = false;
    }

    public void setVaba(boolean vaba) {
        this.vaba = vaba;
    }

    public int getKohaNumber() {
        return this.kohaNumber;
    }
    public void broneeri(){
        this.vaba = false;
    }

    public int getId() {
        return this.id;
    }


    public boolean isVaba() {
        return this.vaba;
    }
}
