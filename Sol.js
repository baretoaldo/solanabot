// Program untuk otomatis mengirim semua SOL dari private key di jaringan Solana ke alamat Anda
// Hanya untuk keperluan hiburan, jangan digunakan untuk tindakan ilegal atau merugikan

// Import library yang diperlukan
const { Account, Connection, PublicKey, Transaction } = require('@solana/web3.js');

// Inisialisasi koneksi ke jaringan Solana
const rpcUrl = 'https://api.mainnet-beta.solana.com'; // Atau gunakan RPC URL yang sesuai
const connection = new Connection(rpcUrl, 'confirmed');

// Definisikan private key Anda
const privateKey = '3nD4t2hSEwrSAiTy91TTgJ3CyMWSQLTjA5EcyBMWrGShta9RgcbSGEkY6PCAEeZDeKksjkXvGKqdvru9gqoeZLPV';

// Definisikan alamat tujuan
const destination = new PublicKey('7XpGaFbPcb6Nz73KPVzzun72RJGN475dUMQH8nCVwkqf');

// Buat objek akun dari private key
const account = new Account(privateKey);

// Dapatkan saldo Solana dari alamat
connection.getBalance(account.publicKey)
  .then(balance => {
    console.log('Saldo Solana dari alamat Anda:', balance);

    // Kirim semua SOL ke alamat tujuan
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account.publicKey,
        toPubkey: destination,
        lamports: balance
      })
    );

    // Tandatangani transaksi
    transaction.sign(account);

    // Kirim transaksi ke jaringan Solana
    return connection.sendTransaction(transaction, [account]);
  })
  .then(signature => {
    console.log('Transaksi berhasil! Signature:', signature);
  })
  .catch(error => {
    console.error('Ada kesalahan:', error);
  });