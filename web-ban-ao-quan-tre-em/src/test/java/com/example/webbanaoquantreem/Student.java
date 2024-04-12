package com.example.webbanaoquantreem;

public class Student{
    private int id;
    private double score;

    public Student() {
    }

    public Student(int id, double score) {
        this.id = id;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

//    @Override
//    public int compareTo(Student o) {
//        return Double.compare(o.score,this.score);
//    }
}
