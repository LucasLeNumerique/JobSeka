interface Instrument
{
    void instrumentSound();
    void instrumentReference();
}

class Guitar : Instrument
{
    public void instrumentSound()
    {
        Console.WriteLine("oui");
    }
    public void instrumentReference()
    {
        Console.WriteLine("ofui");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Guitar myGuitar = new Guitar();
        myGuitar.instrumentReference();
        myGuitar.instrumentSound();
    }
}