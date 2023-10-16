// import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Contract } from "./contracts";

// @Entity()
// export class Product {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column({ type: 'varchar' })
//     name: string;

//     @Column({ type: 'varchar', default: 'https://www.prontaprafesta.com/wp-content/uploads/2018/04/vestido-estilo-princesa-ombro.jpg' })
//     image: string;


//     @Column({ type: 'varchar' })
//     description: string;

//     @Column({ type: 'varchar' })
//     modelo: string;

//     @Column({ type: 'varchar' })
//     color: string;

//     @Column({ type: 'numeric' })
//     code: number;

//     @Column({ type: 'numeric' })
//     price: number;

//     @Column({ type: 'numeric' })
//     totalValue: number;

//     @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
//     createdAt: Date;


//     @Column({ type: 'numeric', default: 0 })
//     popularity: number

//     @ManyToMany(() => Contract, (contract) => contract.products)
//     contracts: Contract[];

// }