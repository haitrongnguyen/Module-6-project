package com.example.webbanaoquantreem;

import java.util.*;

public class Tesst {
    public static void main(String[] args) {
//        List<Student> students = new ArrayList<>();
//        students.add(new Student(1,5));
//        students.add(new Student(2,4));
//        students.add(new Student(3,6));
//        students.add(new Student(4,1));
//        students.add(new Student(5,9));
//        Collections.sort(students);
//        for (Student s:
//                students) {
//            System.out.println(s.getScore());
//        }
//        Collections.sort(students, new Comparator<Student>() {
//            @Override
//            public int compare(Student o1, Student o2) {
//                return Double.compare(o1.getScore(),o2.getScore());
//            }
//        });
//        students.sort((Student o1,Student o2) -> (int) (o1.getScore() - o2.getScore()));
//        for (Student s:
//                students) {
//            System.out.println(s.getScore());
//        }

//        Animal animal = new Cat();
//        animal.eat();
//        Cat cat = (Cat) animal;
//        cat.eat();
//        cat.meow();
        Animal animal = new Animal(10);
        Animal animal1 = new Animal(10);
        Animal animal2 = new Animal(9);
        Set<Animal> animals = new HashSet<>();
        animals.add(animal);
        animals.add(animal1);
        animals.add(animal2);
        for (Animal a:animals
             ) {
            System.out.println(a);
        }
        System.out.println(animal.equals(animal1));

        System.out.println(animal.hashCode() == animal1.hashCode());;



    }
}
