import { Connection, Request, ConnectionConfig } from 'tedious';

export class Database{
  public connection: Connection;
  constructor(private config: ConnectionConfig){
    console.log("Creating")
    this.connection = new Connection(config);
    this.connection.on('connect', (error)=>{
      if(error) {
        console.log("Could not connect to database: " + error);
      } else {
        console.log("No Error.")
        const request = new Request("SELECT * from users", (err: Error, rowCount: number, rows)=>{
          console.log(rows);
        })
      }
    });

  }

}