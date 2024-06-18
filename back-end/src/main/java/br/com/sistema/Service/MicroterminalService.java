package br.com.sistema.Service;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.json.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URL;
import java.util.Scanner;

@Component
public class MicroterminalService {
    private final int port = 1025;
    private ServerSocket serverSocket = null;

    public MicroterminalService() {
        // Constructor is now empty
    }

    @PostConstruct
    public void init() {
        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Server started on port " + serverSocket.getLocalPort() + "...");
            System.out.println("Waiting for client...");
        } catch (IOException e) {
            System.out.println("Error initializing server socket: " + e.getMessage());
        }
    }

    public void start() {
        if (serverSocket == null) {
            System.out.println("Server socket is not initialized.");
            return;
        }
        try {
            Socket socket = serverSocket.accept();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " connected to the server...");

            try (BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
                 DataInputStream dis = new DataInputStream(bis);
                 DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
                 BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {

                while (true) {
                    clearScreen(dos);
                    dos.writeBytes("Digite a matricula :" + "\r\n");

                    StringBuilder userInput = new StringBuilder();
                    while (true) {
                        int inputChar = in.read();
                        if (inputChar == 13) {  // Check if the user pressed Enter
                            break;
                        }
                        userInput.append((char) inputChar);
                        dos.writeByte(inputChar);
                    }

                    String studentId = userInput.toString();
                    String response = getAulaInfo(studentId);
                    displayAulaInfo(response, dos, studentId);

                    while (in.read() != 13) {
                        // Wait until the user presses Enter
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                socket.close();
                System.out.println("Client " + socket.getRemoteSocketAddress() + " disconnected from the server...");
            }
        } catch (IOException e) {
            System.out.println("Error: " + e);
        }
    }

    private String getAulaInfo(String studentId) throws IOException {
        String apiUrl = "http://192.168.15.50:8080/api/aulas/proxima/" + studentId;
        URL url = new URL(apiUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        int responseCode = conn.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            Scanner scanner = new Scanner(conn.getInputStream());
            StringBuilder response = new StringBuilder();
            while (scanner.hasNextLine()) {
                response.append(scanner.nextLine());
            }
            scanner.close();
            return response.toString();
        } else {
            return null;
        }
    }

    private void displayAulaInfo(String response, DataOutputStream dos, String studentId) {
        if (response != null) {
            JsonReader reader = Json.createReader(new StringReader(response));
            JsonObject aulaInfo = reader.readObject();

            JsonObject local = aulaInfo.getJsonObject("local");
            String localDescription = local.getString("descricao");

            String localFirstLetters = localDescription.split(" ")[0].substring(0, Math.min(4, localDescription.split(" ")[0].length()));
            String localRest = localDescription.replaceFirst(localFirstLetters, "").trim();

            JsonArray horarios = aulaInfo.getJsonArray("horarios");
            JsonObject firstHorario = horarios.getJsonObject(0);
            String horaInicio = firstHorario.getString("horaInicio");

            JsonArray alunos = aulaInfo.getJsonArray("alunos");
            String firstName = "";

            for (int i = 0; i < alunos.size(); i++) {
                JsonObject aluno = alunos.getJsonObject(i);
                String matricula = aluno.getString("matricula");
                if (matricula.equals(studentId)) {
                    String alunoNome = aluno.getString("nome");
                    firstName = alunoNome.split(" ")[0];
                    break;
                }
            }

            JsonObject disciplina = aulaInfo.getJsonObject("disciplina");
            String siglaDisciplina = disciplina.getString("sigla");

            try {
                clearScreen(dos);

                dos.writeBytes("Ola, " + firstName + "\r\n");
                dos.writeBytes("Disciplina: " + siglaDisciplina + "\r\n");
                dos.writeBytes("Aula: " + localFirstLetters + " " + localRest + "\r\n");
                dos.writeBytes("Horario: " + horaInicio + "\r\n");
            } catch (IOException e) {
                e.printStackTrace();
            }

        } else {
            try {
                clearScreen(dos);
                dos.writeBytes("Matricula nao foi" + "\r\n" + "encontrada");
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("Error: Unable to fetch class information.");
        }
    }

    private void clearScreen(DataOutputStream dos) throws IOException {
        dos.writeBytes("\033[H\033[2J");
        dos.flush();
    }
}