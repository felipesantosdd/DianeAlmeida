// import { z } from 'zod'

// const clientSchema = z.object({
//     name: z.string().min(3, { message: 'O usuario precisa de um nome' })
// })

// type Client = z.infer<typeof clientSchema>

// export function print(client: Client) {
//     console.log('Oii ' + client.name)
//     return 'Oii ' + client.name
// }
// const client = { name: 'Felipe' }
// print(client)

import 'reflect-metadata';
import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then(() => {
        // const PORT: number = Number(process.env.PORT || 3000);
        const PORT: number = 3000;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.error(error));