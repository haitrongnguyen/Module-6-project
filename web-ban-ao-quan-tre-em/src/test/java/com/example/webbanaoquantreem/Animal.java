package com.example.webbanaoquantreem;

import java.util.Objects;

public class Animal {
    private int speed;

    public Animal(int speed) {
        this.speed = speed;
    }

    public void eat() {
        System.out.println("eating...");
    }
    public int plus(int a,int b) {
        return a+b;
    }
    public double plus(double a,int b) {
        return a+b;
    }
    @Override
    public String toString() {
        return "Animal{" +
                "speed=" + speed +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Animal animal = (Animal) o;
        return speed == animal.speed;
    }

    @Override
    public int hashCode() {
        return Objects.hash(speed);
    }
}
